import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DateFilter: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm font-medium">Selecciona una fecha:</label>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default DateFilter;