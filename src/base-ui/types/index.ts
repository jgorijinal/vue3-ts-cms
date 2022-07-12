export interface IFormItems {
  type: "input" | "password" | "select" | "datePicker";
  label?: string;
  rules?: any[];
  placeholder?: string;
  //针对 select
  selectOptions?: ISelectOptions[];
  //针对 datepicker
  datePickerOptions?: IDatePickerOptions;
}

interface ISelectOptions {
  label: string;
  value: string;
}
interface IDatePickerOptions {
  startPlaceholder: string;
  endPlaceholder: string;
  type: string;
}

export interface formConfig {
  formItems: IFormItems[];
  labelWidth?: string;
  formItemStyle?: any;
  colLayout?: any;
}
