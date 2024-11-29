import PropTypes from "prop-types";

// Prop Types
DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  fromDate: PropTypes.string.isRequired,
  toDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, // Function to handle date changes
};

// Default Props
DateInput.defaultProps = {
  fromLabel: "From Date",
  toLabel: "To Date",
};

export default function DateInput({ label="Date", fromDate, toDate, onChange }) {
  return (
    <div className="flex space-y-4">
      {/* From Date Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          type="date"
          id="from"
          name="from"
          value={fromDate}
          onChange={(e) => onChange("from", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none w-30"
          placeholder="From"
        />
      </div>

      {/* To Date Input */}
      <div>
        <input
          type="date"
          id="to"
          name="to"
          value={toDate}
          onChange={(e) => onChange("to", e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none w-30 pt-2"
        />
      </div>
    </div>
  );
}


