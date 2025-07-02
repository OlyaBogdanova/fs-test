import { FormFieldType } from "@/types";
import { FieldTypesEnum } from "@/types/enums";

export const fields: FormFieldType[] = [
  {
    type: FieldTypesEnum.U_INPUT,
    label: "Логин",
    name: "login",
    inputType: "text",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 255,
    },
  },
  {
    type: FieldTypesEnum.U_INPUT,
    label: "Email",
    name: "email",
    inputType: "email",
    validation: {
      required: false,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Введите валидный email",
      },
    },
  },
  {
    type: FieldTypesEnum.U_INPUT,
    label: "Пароль",
    name: "password",
    inputType: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
  {
    type: FieldTypesEnum.U_SELECT,
    label: "Роль",
    name: "role",
    placeholder: "Выберите роль",
    options: [
      { id: "admin", name: "Админ" },
      { id: "user", name: "Пользователь" },
    ],
    validation: {
      required: true,
    },
  },
  {
    type: FieldTypesEnum.U_CHECKBOX,
    name: "accept",
    label: "Согласие с политикой конфиденциальности",
    validation: {
      required: true,
    },
  },
];
