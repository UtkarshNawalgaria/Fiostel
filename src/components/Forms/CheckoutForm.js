import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Divider from '../Divider';
import Heading from '../Heading';
import MyInputField from './MyInputField'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address')
    .max(255, 'Must be shorter than 255')
    .required('Must enter an email address'),
  phone: Yup.string()
    .matches('^[0-9]{10}$', 'Invalid Phone Number')
    .length(10, 'Length must be 10')
    .required('Phone number should be provided'),
  place: Yup.string()
    .min(10, 'Length must be grater than 10')
    .max(255, 'Length must be less than 255')
    .required('Must enter the Street Address'),
  pincode: Yup.string() 
    .matches('^[0-9]{6}$', 'Pincode should only have numbers')
    .required('Must enter a pincode'),
  state: Yup.string().required('State is Required')
});

const CheckoutForm = () => (
  <Formik
    initialValues={{
      email: '',
      phone: '',
      place: '',
      pincode: '',
      state: '',
      country: 'India',
    }}
    validationSchema={schema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
    autoComplete="off"
  >
    {(props) => (
      <Form {...props}>
        <div className="p-4 md:w-2/3">
          {/* Contact Information */}
          <div className="mb-6">
            <Heading
              title={'Contact Information'}
              type="h2"
              styles={'text-2xl font-semibold pb-4'}
            />
            <MyInputField
              name="email"
              type="email"
              label="Email"
              placeholder="Email Address"
            />
            <MyInputField
              name="phone"
              type="text"
              label="Phone"
              placeholder="Phone Number"
            />
          </div>
          <Divider />

          {/* Delivery Address */}
          <div className="mb-6">
            <Heading
              title={'Delivery Address'}
              type="h2"
              styles={'text-2xl font-semibold pb-4'}
            />
            <div>
              <MyInputField
                name="place"
                type="text"
                label="Street Address"
                placeholder="Street Address"
              />
              <MyInputField
                name="pincode"
                type="text"
                label="Pincode"
                placeholder="Pincode"
              />
              <MyInputField name="state" type="text" label="State/UT" />
              <MyInputField name="country" type="text" label="Country" disabled="true"/>
            </div>
          </div>
          <button
            disabled={props.isSubmitting}
            type="submit"
            className="disabled:opacity-50 w-full mt-6 px-4 py-3 bg-green text-white text-center "
          >
            <a className="w-full">Checkout</a>
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default CheckoutForm;
