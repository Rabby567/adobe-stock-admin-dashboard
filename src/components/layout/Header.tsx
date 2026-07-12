import {
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10">

      {/* Left */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="text-slate-500 mt-1">
          Welcome back, Fazle Rabby
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative">

          <MagnifyingGlassIcon
            className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-72
              h-11
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-12
              pr-4
              outline-none
              focus:border-blue-500
              focus:bg-white
              transition
            "
          />

        </div>

        {/* Notification */}

        <button
          className="
            w-11
            h-11
            rounded-xl
            bg-slate-100
            hover:bg-slate-200
            transition
            flex
            items-center
            justify-center
          "
        >
          <BellIcon className="w-6 h-6 text-slate-700" />
        </button>

        {/* Profile */}

        <div className="flex items-center gap-3">

          <div className="text-right">

            <div className="font-semibold text-slate-900">
              Fazle Rabby
            </div>

            <div className="text-sm text-green-600">
              ● Online
            </div>

          </div>

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-lg
              font-bold
            "
          >
            FR
          </div>

        </div>

      </div>

    </header>
  );
}