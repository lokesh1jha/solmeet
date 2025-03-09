import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
type Time = {
    hour: string;
    minute: string;
    period: string;
  };
  
  type TimeSelectorProps = {
    label: string;
    time: Time;
    setTime: React.Dispatch<React.SetStateAction<Time>>;
  };
  

  const TimeSelector: React.FC<TimeSelectorProps> = ({ label, time, setTime }) => {
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const minutes = ["00", "30"];
    const periods = ["AM", "PM"];
  
    return (
      <div className="flex space-x-2 items-center">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-16 text-left">{time.hour}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black rounded shadow-lg p-2">
            {hours.map((hour) => (
              <DropdownMenuItem key={hour} onClick={() => setTime((prev:any) => ({ ...prev, hour }))}>
                {hour}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-12 text-left">{time.minute}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black rounded shadow-lg p-2">
            {minutes.map((minute) => (
              <DropdownMenuItem key={minute} onClick={() => setTime((prev:any) => ({ ...prev, minute }))}>
                {minute}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-12 text-left">{time.period}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black rounded shadow-lg p-2">
            {periods.map((period) => (
              <DropdownMenuItem key={period} onClick={() => setTime((prev:any) => ({ ...prev, period }))}>
                {period}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

 export default TimeSelector