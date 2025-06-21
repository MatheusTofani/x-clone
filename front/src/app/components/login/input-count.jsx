export default function InputCount({ value, onChange }) {
  return (
    <div className="relative w-full mt-6">
      <input
        type="text"
        name="full_name"
        value={value}
        onChange={onChange}
        maxLength={50}
        placeholder=" "
        className="h-[64px] peer w-full px-3 pt-6 pb-2 text-[#E7E9EA] border border-gray-500 rounded-md outline-none focus:border-[#1A8CD8]"
      />
      <label
        htmlFor="full_name"
        className="cursor-text absolute left-3 top-2 text-gray-500 text-sm transition-all
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-[18px] peer-placeholder-shown:text-gray-500
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#1A8CD8] px-1"
      >
        Nome
      </label>
      <div className="absolute top-2 right-3 text-xs text-gray-400 peer-focus:flex hidden">
        {value.length}/50
      </div>
    </div>
  );
}
