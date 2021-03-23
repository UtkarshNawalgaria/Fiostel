import { useFormik } from 'formik';

export const ReservationForm = ({ roomSlug: slug}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date1: '',
      duration: "1",
      roomSlug: slug
    },
    onSubmit: values => console.log(values),
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type="hidden" value={formik.values.slug} />
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <input
            required={true}
            type="text"
            id="name"
            name="name"
            {...formik.getFieldProps('name')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email:</label>
          <input
            required={true}
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone">Phone Number:</label>
          <input
            required={true}
            type="text"
            id="phone"
            name="phone"
            {...formik.getFieldProps('phone')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4 flex gap-2 w-full">
          <div className="w-1/2">
            <label htmlFor="date1">Starting Date:</label>
            <input
              required={true}
              type="date"
              id="date1"
              name="date1"
              {...formik.getFieldProps('date1')}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="duration">Duration</label>
            <select
              required={true}
              name="duration"
              id="duration"
              name="duration"
              {...formik.getFieldProps('duration')}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            >
              <option value="1">1 month</option>
              <option value="2">2 months</option>
              <option value="3">3 months</option>
              <option value="4">4 months</option>
              <option value="5">5 months</option>
              <option value="6">6 months</option>
              <option value="7">7 months</option>
              <option value="8">8 months</option>
              <option value="9">9 months</option>
              <option value="10">10 months</option>
              <option value="11">11 months</option>
              <option value="12">12 months</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full my-2 bg-yellow-300 font-semibold text-xl text-white px-2 py-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
