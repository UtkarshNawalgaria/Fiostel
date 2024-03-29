import { Formik, Form } from 'formik'
import MyInputField from './MyInputField'
import { reservationSchema } from '../../utils/schema'

const ReservationForm = () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      phone: '',
    }}
    validationSchema={reservationSchema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
  >
    {(props) => (
      <Form {...props}>
        <MyInputField
          name="name"
          type="text"
          label="Name"
          placeholder="Your full Name"
        />

        <MyInputField
          name="email"
          type="email"
          label="Email"
          placeholder="Your Email Address"
        />

        <MyInputField
          name="phone"
          type="text"
          label="Phone Number"
          placeholder="Your Phone Number"
        />

        <button
          disabled={props.isSubmitting}
          type="submit"
          className="disabled:opacity-50 w-full my-2 bg-yellow-400 font-semibold text-lg px-2 py-2 rounded-md"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
)

export default ReservationForm
