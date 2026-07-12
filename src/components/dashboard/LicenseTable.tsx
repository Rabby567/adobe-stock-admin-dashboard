import {
  EyeIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import type { License } from "../../types/license";

type Props = {
  licenses: License[];
  search: string;
  onDelete: (id: string) => void;
  onEdit: (license: License) => void;
  onView: (license: License) => void;
};

export default function LicenseTable({
  licenses,
  search,
  onDelete,
  onEdit,
  onView,
}: Props) {
  const keyword = search.toLowerCase();

  const filteredLicenses = licenses.filter((item) => {
    return (
      item.licenseKey.toLowerCase().includes(keyword) ||
      item.customer.toLowerCase().includes(keyword) ||
      item.email.toLowerCase().includes(keyword) ||
      item.plan.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden">
    <div className="overflow-x-auto">
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-bold">Recent Licenses</h2>
      </div>

      <table className="min-w-[1400px] w-full table-fixed">
        <thead className="bg-slate-50">
          <tr>
            <th className="w-56 px-6 py-4 text-left">License</th>
            <th className="w-48 px-6 py-4 text-left">Customer</th>
            <th className="w-64 px-6 py-4 text-left">Email</th>
            <th className="w-28 px-6 py-4 text-left">Plan</th>
            <th className="w-32 px-6 py-4 text-left">Expiry</th>
            <th className="w-28 px-6 py-4 text-left">Status</th>
            <th className="w-64 px-6 py-4 text-left">Device</th>
            <th className="w-44 px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLicenses.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-16 text-slate-400"
              >
                No Licenses Found
              </td>
            </tr>
          ) : (
            filteredLicenses.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap font-mono font-semibold text-sm">
                  {item.licenseKey}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {item.customer}
                </td>

                <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.email}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {item.plan}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {item.expiry}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Unused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td
  className="px-6 py-4 font-mono text-xs max-w-[220px] truncate"
  title={item.device}
>
  {item.device}
</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      title="View"
                      onClick={() => onView(item)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-600 transition flex items-center justify-center"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => onEdit(item)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-600 transition flex items-center justify-center"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Extend"
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-green-100 hover:text-green-600 transition flex items-center justify-center"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => onDelete(item.id)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}