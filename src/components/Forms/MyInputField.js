import { useField } from 'formik'

const MyInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label>
        {label}
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error ? 'form-input-error' : 'form-input'
          }
        />
      </label>
      {meta.touched && meta.error ? (
        <div>
          <p className="text-red-500 text-sm">{meta.error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default MyInputField
