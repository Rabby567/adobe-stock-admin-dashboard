import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between px-7 py-5 border-b">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-slate-100
              transition
              flex
              items-center
              justify-center
            "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

        </div>

        {/* Body */}

        <div className="p-7">

          {children}

        </div>

      </div>
    </div>
  );
}