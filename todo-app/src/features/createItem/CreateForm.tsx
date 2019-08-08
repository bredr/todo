import { grpc } from "@improbable-eng/grpc-web";
import { createStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { Field, Form, Formik, FormikActions, FormikProps } from "formik";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import React from "react";
import { useDispatch } from "react-redux";
import uuid from "uuid/v4";
import * as Yup from "yup";
import { Item } from "../../proto/todo_pb";
import { Todo } from "../../proto/todo_pb_service";
import { getItemsAction } from "../pagination/Pagination";
import * as toaster from "../toaster/state/actions";
import { FormikDatePicker } from "./DatePicker";
import actions from "./state/actions";

const HOUR = 3.6e6;

interface IValues {
  description: string;
  hourstocomplete: number;
  due?: Date | 0;
}

interface IProps {
  item?: Item.AsObject;
}

const upsertItemAction = (values: IValues, id?: string) => {
  const request = new Item();
  const created = new Timestamp();
  created.setSeconds(Date.now());
  request.setCreated(created);
  request.setId(id || "");
  request.setDescription(values.description);
  request.setHourstocomplete(values.hourstocomplete);
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
        ? toaster.addSuccess(message)
        : toaster.addError(message)
  });
};

export const CreateForm: React.FC<IProps> = (props = { item: undefined }) => {
  const dispatch = useDispatch();

  const initialValues = {
    description: (props.item && props.item.description) || "",
    hourstocomplete: (props.item && props.item.hourstocomplete) || 0,
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={form}
      validationSchema={validationSchema}
      validateOnChange={true}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

const form = (props: FormikProps<IValues>) => {
  const {
    values: { description, due, hourstocomplete },
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
      <TextField
        id="hourstocomplete"
        label="Hours to complete"
        value={hourstocomplete}
        onChange={change.bind(null, "hourstocomplete")}
        helperText={touched.hourstocomplete ? errors.hourstocomplete : ""}
        error={touched.hourstocomplete && Boolean(errors.hourstocomplete)}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Field component={FormikDatePicker} name="due" />
      <Button
        type="submit"
        fullWidth={true}
        variant="outlined"
        color="primary"
        disabled={!isValid}
      >
        Submit
      </Button>
    </Form>
  );
};

const validationSchema = Yup.object<IValues>({
  description: Yup.string().required("Description is required"),
  hourstocomplete: Yup.number()
    .required("Hours to complete required")
    .min(0),
  due: Yup.date()
    .notRequired()
    .test("achievable", "Must be achievable", function(value) {
      const { hourstocomplete } = this.parent;
      return !value || new Date(Date.now() + hourstocomplete * HOUR) < value;
    })
});
