import { useState, useEffect } from "react";

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function DateSelect({ value, onChange }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-");
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [value]);

  useEffect(() => {
    if (year && month && day) {
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDay = day.toString().padStart(2, "0");
      onChange(`${year}-${formattedMonth}-${formattedDay}`);
    }
  }, [year, month, day]);

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      <div className="relative flex-1 min-w-[100px]">
        <label htmlFor="month" className="absolute left-3 top-2 px-1 text-sm text-gray-500 pointer-events-none">
          Mês
        </label>
        <select
          id="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="w-full p-3 pt-6 rounded-md border border-gray-500 bg-black text-white focus:outline-none focus:border-[#1A8CD8] appearance-none"
        >
          <option value="" disabled hidden></option>
          {months.map((m, i) => (
            <option key={i} value={(i + 1).toString()}>{m}</option>
          ))}
        </select>
      </div>

      <div className="relative flex-1 min-w-[100px]">
        <label htmlFor="day" className="absolute left-3 top-2 px-1 text-sm text-gray-500 pointer-events-none">
          Dia
        </label>
        <select
          id="day"
          value={day}
          onChange={e => setDay(e.target.value)}
          className="w-full p-3 pt-6 rounded-md border border-gray-500 bg-black text-white focus:outline-none focus:border-[#1A8CD8] appearance-none"
        >
          <option value="" disabled hidden></option>
          {days.map(d => (
            <option key={d} value={d.toString()}>{d}</option>
          ))}
        </select>
      </div>

      <div className="relative flex-1 min-w-[100px]">
        <label htmlFor="year" className="absolute left-3 top-2 px-1 text-sm text-gray-500 pointer-events-none">
          Ano
        </label>
        <select
          id="year"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="w-full p-3 pt-6 rounded-md border border-gray-500 bg-black text-white focus:outline-none focus:border-[#1A8CD8] appearance-none"
        >
          <option value="" disabled hidden></option>
          {years.map(y => (
            <option key={y} value={y.toString()}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
