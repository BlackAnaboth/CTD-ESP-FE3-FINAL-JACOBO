import * as yup from "yup";
import { errorMessages } from "./error-messages";

const paymentSchema = yup
  .object({
    number: yup
      .string()
      .min(16, errorMessages.number.min)
      .required(errorMessages.number.required),
    nameOnCard: yup.string().required(errorMessages.nameOnCard.required),
    expDate: yup
      .string()
      .min(4, errorMessages.expDate.min)
      .required(errorMessages.expDate.required),
    cvc: yup
      .string()
      .min(3, errorMessages.cvc.min)
      .required(errorMessages.cvc.required),
  })
  .required(errorMessages.form.required);

export default paymentSchema;
