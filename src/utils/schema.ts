import * as Yup from 'yup'

export const checkoutSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be shorter than 255')
    .required('Must enter an email address'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Phone Number')
    .length(10, 'Length must be 10')
    .required('Phone number should be provided'),
  place: Yup.string()
    .min(10, 'Length must be grater than 10')
    .max(255, 'Length must be less than 255')
    .required('Must enter the Street Address'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Pincode should only have numbers')
    .required('Must enter a pincode'),
  state: Yup.string().required('State is Required'),
  city: Yup.string().required('City must be entered'),
})

export const reservationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name length more than 3')
    .max(50)
    .required('Name is required'),
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be shorter than 255')
    .required('Must enter an email address'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Phone Number')
    .length(10, 'Length must be 10')
    .required('Phone number should be provided'),
})
