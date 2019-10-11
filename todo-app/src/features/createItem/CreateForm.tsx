import { grpc } from "@improbable-eng/grpc-web";
import { createStyles, Grid, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Field, Form, Formik, FormikActions, FormikProps } from "formik";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Item } from "../../proto/todo_pb";
import { Todo } from "../../proto/todo_pb_service";
import { getItemsAction } from "../pagination/Pagination";
import * as toaster from "../toaster/state/actions";
import { CreateClose } from "./CreateClose";
import { FormikDatePicker } from "./DatePicker";
import actions from "./state/actions";

const DAY = 24 * 3.6e6;

interface IValues {
  description: string;
  daystocomplete: number;
  id?: string;
  due?: Date | 0;
}

interface IProps {
  item?: Item.AsObject;
  editing?: boolean;
}

const upsertItemAction = (values: IValues, id?: string) => {
  const request = new Item();
  const created = new Timestamp();
  created.setSeconds(Date.now());
  request.setCreated(created);
  request.setId(id || "");
  request.setDescription(values.description);
  request.setDaystocomplete(values.daystocomplete);
  if (values.due) {
    const due = new Timestamp();
    due.setSeconds(values.due.valueOf() / 1000);
    request.setDue(due);
  }
  return actions.upsertItem({
    methodDescriptor: Todo.UpsertItem,
    request,
    onMessage: () => getItemsAction(),
    onEnd: (code, message) =>
      code === grpc.Code.OK
        ? toaster.addSuccess("Updated")
        : toaster.addError(message)
  });
};

export const CreateForm: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialValues = {
    description: (props.item && props.item.description) || "",
    daystocomplete: (props.item && props.item.daystocomplete) || 0,
    id: props.item && props.item.id,
    due:
      props.item &&
      props.item.due &&
      props.item.due.seconds &&
      new Date(props.item.due.seconds)
  };

  const onSubmit = (
    values: IValues,
    { setSubmitting }: FormikActions<IValues>
  ) => {
    const id = (props.item && props.item.id) || undefined;
    setSubmitting(true);
    dispatch(upsertItemAction(values, id));
    dispatch(actions.close());
    return;
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={form}
          validationSchema={validationSchema}
          validateOnChange={true}
        />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 200
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const form = (props: FormikProps<IValues>) => {
  const {
    values: { description, daystocomplete, id },
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name: keyof IValues, e: React.ChangeEvent | any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Form>
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <TextField
            id="description"
            name="description"
            helperText={touched.description ? errors.description : ""}
            error={touched.description && Boolean(errors.description)}
            label="Description"
            value={description}
            onChange={change.bind(null, "description")}
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <TextField
            id="daystocomplete"
            label="Days to complete"
            value={daystocomplete}
            onChange={change.bind(null, "daystocomplete")}
            helperText={touched.daystocomplete ? errors.daystocomplete : ""}
            error={touched.daystocomplete && Boolean(errors.daystocomplete)}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <Field component={FormikDatePicker} name="due" />
        </Grid>
        <Grid item={true} xs={6}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth={true}
            color="primary"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Grid>
        <Grid item={true} xs={6}>
          <CreateClose {...{ id }} />
        </Grid>
      </Grid>
    </Form>
  );
};

export const validationSchema = Yup.object<IValues>().shape({
  description: Yup.string().required("Description is required"),
  daystocomplete: Yup.number()
    .required("Days to complete required")
    .min(0),
  due: Yup.date()
    .notRequired()
    .test("achievable", "Must be achievable", function(value) {
      const { daystocomplete } = this.parent;
      const currentDate = new Date(Date.now());
      const currentTime = currentDate.getHours();

      return (
        !value ||
        new Date(
          (currentTime > 10 ? DAY - currentTime : 0) +
            new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() +
            daystocomplete * DAY
        ) <= value
      );
    })
});
