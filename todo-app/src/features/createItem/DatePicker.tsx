import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { FormikActions, FormikState } from "formik";
import React from "react";

interface IProps<T> {
  field: { name: Extract<keyof T, string>; value: any };
  form: FormikActions<T> & FormikState<T>;
}

export function FormikDatePicker<T>({ field, form }: IProps<T>) {
  const { name, value } = field;
  const { errors, setFieldValue } = form;
  const handleChange = (d: MaterialUiPickersDate) => {
    setFieldValue(name, d);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        label={name}
        value={value}
        onChange={handleChange}
        disablePast={true}
        autoOk={true}
        helperText={errors[name]}
        animateYearScrolling={true}
      />
    </MuiPickersUtilsProvider>
  );
}
