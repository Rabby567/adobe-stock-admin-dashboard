import type { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {

    variant?: Variant;

    loading?: boolean;

    children: React.ReactNode;

  };

export default function Button({

  variant = "primary",

  loading = false,

  children,

  className = "",

  ...props

}: Props) {

  const styles = {

    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white",

    outline:
      "border border-slate-300 bg-white hover:bg-slate-50 text-slate-800",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

  };

  return (

    <button

      {...props}

      disabled={loading || props.disabled}

      className={`

        h-11

        px-6

        rounded-xl

        font-semibold

        transition-all

        duration-200

        disabled:opacity-50

        disabled:cursor-not-allowed

        shadow-sm

        ${styles[variant]}

        ${className}

      `}

    >

      {loading ? "Loading..." : children}

    </button>

  );

}