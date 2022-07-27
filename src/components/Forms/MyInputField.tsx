import { useField } from 'formik'

type InputFieldProps = {
  name: string
  type: string
  label: string
  placeholder?: string
  disabled?: boolean
}

const MyInputField = (props: InputFieldProps) => {
  const [field, meta] = useField(props.name)
  return (
    <div className="mb-2">
      <label>
        {props.label}
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
  )
}

export default MyInputField
