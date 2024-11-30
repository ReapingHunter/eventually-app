import PropTypes from 'prop-types'

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

TextInput.defaultProps = {
  type: "text",
}

export default function TextInput({label, id, type="text", value, onChange, placeholder=""}){
  return(
    <>
      <label htmlFor={id} className="font-bold text-[#363636] mb-3">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none border-2 border-[#363636] rounded-md mb-3 px-3 py-2 w-full"
        placeholder={placeholder}
        required>
      </input>
    </>
  )
}