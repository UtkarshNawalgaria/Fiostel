import { Formik, Form } from 'formik';
import MyInputField from './MyInputField'
import { reservationSchema } from '../../utils/schema'

const ReservationForm = ({ roomSlug: slug }) => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      phone: '',
      // date: '',
      // duration: '1',
      // roomSlug: slug,
    }}
    validationSchema={reservationSchema}
    onSubmit={(values, actions) => {
      console.log("After submitting")
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
    }}
    autoComplete="off"
  >
    {(props) => (
      <Form {...props}>
        {/* <MyInputField type="hidden" name="roomSlug" label="Room slug" /> */}
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
          className="disabled:opacity-50 w-full my-2 bg-yellow-300 font-semibold text-lg text-white px-2 py-2 rounded-md"
        >
          Submit
        </button>
      </Form>
    )}
  </Formik>
);
  // return (
  //   <>
  //     <form onSubmit={formik.handleSubmit}>

  //       <div className="mb-4 flex gap-2 w-full">
  //         <div className="w-1/2">
  //           <label htmlFor="date">Starting Date:</label>
  //           <input
  //             required={true}
  //             type="date"
  //             id="date"
  //             name="date"
  //             {...formik.getFieldProps('date')}
  //             className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
  //           />
  //         </div>
  //         <div className="w-1/2">
  //           <label htmlFor="duration">Duration</label>
  //           <select
  //             required={true}
  //             name="duration"
  //             id="duration"
  //             name="duration"
  //             {...formik.getFieldProps('duration')}
  //             className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
  //           >
  //             <option value="1">1 month</option>
  //             <option value="2">2 months</option>
  //             <option value="3">3 months</option>
  //             <option value="4">4 months</option>
  //             <option value="5">5 months</option>
  //             <option value="6">6 months</option>
  //             <option value="7">7 months</option>
  //             <option value="8">8 months</option>
  //             <option value="9">9 months</option>
  //             <option value="10">10 months</option>
  //             <option value="11">11 months</option>
  //             <option value="12">12 months</option>
  //           </select>
  //         </div>
  //       </div>

  //       
  //     </form>
  //   </>
  // );


export default ReservationForm;
