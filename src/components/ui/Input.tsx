import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({
  label,
  className = "",
  ...props
}: Props) {
  return (
    <div className="w-full">

      {label && (
        <label className="block mb-2 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full
          h-11
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          ${className}
        `}
      />

    </div>
  );
}