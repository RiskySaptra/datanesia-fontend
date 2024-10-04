interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div id="date-range-picker" className="flex items-center">
      <div className="relative">
        <input
          id="datepicker-range-start"
          name="start"
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <span className="mx-4 text-gray-500">to</span>
      <div className="relative">
        <input
          id="datepicker-range-end"
          name="end"
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
