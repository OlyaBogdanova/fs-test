import { FieldTypesEnum } from "./enums";

export type FieldType =
  | FieldTypesEnum.U_INPUT
  | FieldTypesEnum.U_SELECT
  | FieldTypesEnum.U_CHECKBOX;

type ValidationRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: {
    value: RegExp;
    errorMessage: string;
  };
};
type BaseFormFieldType = {
  type: FieldType;
  label: string;
  validation?: ValidationRules;
  name: string;
};

type Option = {
  id: string;
  name: string;
};
export type InputField = BaseFormFieldType & {
  type: FieldTypesEnum.U_INPUT;
  inputType: "text" | "email" | "password" | "number";
  placeholder?: string;
};
export type CheckboxField = BaseFormFieldType & {
  type: FieldTypesEnum.U_CHECKBOX;
};
export type SelectField = BaseFormFieldType & {
  type: FieldTypesEnum.U_SELECT;
  options?: Option[];
  placeholder?: string;
};

export type FormFieldType = InputField | SelectField | CheckboxField;
