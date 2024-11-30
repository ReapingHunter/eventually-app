import PropTypes from 'prop-types'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

SearchBar.defaultProps = {
  type: "text",
}

export default function SearchBar({id, type="text", value, onChange, placeholder=""}){
  return(
    <>
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-2.5 w-5 h-5 text-gray-400" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="bg-transparent outline-none border-2 border-[#7b00d4] bg-[#fbfbfb] rounded-2xl pr-3 pl-10 py-2 w-full"
          placeholder={placeholder}
          required>
        </input>
      </div>
    </>
  )
}