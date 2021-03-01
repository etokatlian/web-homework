import * as Yup from 'yup'

export const transactionValidationSchema = Yup.object({
  description: Yup.string()
    .max(75, 'Must be 75 characters or less')
    .required('Required'),
  amount: Yup.number()
    .required('Required'),
  paymentType: Yup.string()
    .required('Required')
})
