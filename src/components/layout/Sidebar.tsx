import {
  HomeIcon,
  KeyIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-950 text-white flex flex-col">

      {/* Logo */}

      <div className="px-8 pt-10 pb-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold">
          Adobe Stock
        </h1>

        <p className="text-slate-400 mt-2">
          License Manager
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-5 py-8 space-y-2">

        <MenuItem
          active
          icon={<HomeIcon className="w-5 h-5" />}
          title="Dashboard"
        />

        <MenuItem
          icon={<KeyIcon className="w-5 h-5" />}
          title="Licenses"
        />

        <MenuItem
          icon={<UsersIcon className="w-5 h-5" />}
          title="Customers"
        />

        <MenuItem
          icon={<ChartBarIcon className="w-5 h-5" />}
          title="Analytics"
        />

        <MenuItem
          icon={<ClipboardDocumentListIcon className="w-5 h-5" />}
          title="Activity"
        />

        <MenuItem
          icon={<Cog6ToothIcon className="w-5 h-5" />}
          title="Settings"
        />

      </nav>

      {/* Bottom */}

      <div className="p-5 border-t border-slate-800">

        <MenuItem
          icon={<ArrowLeftStartOnRectangleIcon className="w-5 h-5" />}
          title="Logout"
        />

      </div>

    </aside>
  );
}

type MenuProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
};

function MenuItem({
  icon,
  title,
  active,
}: MenuProps) {
  return (
    <button
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition-all
        duration-200

        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-900 hover:text-white"
        }
      `}
    >
      {icon}

      <span className="font-medium">
        {title}
      </span>
    </button>
  );
}