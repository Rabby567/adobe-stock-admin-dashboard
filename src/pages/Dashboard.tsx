import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatCard from "../components/dashboard/StatCard";
import LicenseTable from "../components/dashboard/LicenseTable";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


import { useEffect } from "react";
import {
  getLicenses,
  createLicense,
  updateLicense,
  deleteLicense,
} from "../services/licenseApi";

import { useState } from "react";
import Modal from "../components/ui/Modal";
import type { License } from "../types/license";
import {
  generateLicenseKey,
  calculateExpiry,
} from "../utils/license";

import {
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";




export default function Dashboard() {

const [licenses, setLicenses] = useState<License[]>([]);

const loadLicenses = async () => {
  try {
    const data = await getLicenses();
    setLicenses(data.licenses ?? data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  const init = async () => {
    await loadLicenses();
  };

  init();
}, []);


const [deleteId, setDeleteId] = useState<string | null>(null);

const [openModal, setOpenModal] = useState(false);

const [customer, setCustomer] = useState("");

const [viewLicense, setViewLicense] = useState<License | null>(null);

const [email, setEmail] = useState("");

const [search, setSearch] = useState("");

const [plan, setPlan] = useState<
  "Lifetime" | "1 Year" | "6 Months" | "3 Months"
>("Lifetime");

const totalLicenses = licenses.length;

const activeLicenses = licenses.filter(
  (l) => l.status === "Active"
).length;

const expiredLicenses = licenses.filter(
  (l) => l.status === "Expired"
).length;

const customerCount = new Set(
  licenses.map((l) => (l.email || "").toLowerCase())
).size;

const [editLicense, setEditLicense] = useState<License | null>(null);

const handleSaveLicense = async () => {
  if (!customer.trim() || !email.trim()) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const licenseKey = generateLicenseKey();

    const result = await createLicense({
      id: licenseKey,
      licenseKey,
      customer,
      email,
      plan,
      issueDate: new Date().toISOString().slice(0, 10),
      expiry: calculateExpiry(plan),
      device: "-",
      status: "Unused",
      lastCheck: "",
      notes: "",
    });

    if (result.success) {
      await loadLicenses();

      setCustomer("");
      setEmail("");
      setPlan("Lifetime");
      setOpenModal(false);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);
    alert("Create License Failed");
  }
};


  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">

          {/* Page Container */}
          <div className="w-full max-w-[1550px] mx-auto">

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">

              <StatCard
                title="Total Licenses"
                value={totalLicenses}
                color="#2563eb"
                icon={<KeyIcon className="w-7 h-7" />}
              />

              <StatCard
                title="Active"
                value={activeLicenses}
                color="#16a34a"
                icon={<CheckCircleIcon className="w-7 h-7" />}
              />

              <StatCard
                title="Expired"
                value={expiredLicenses}
                color="#f59e0b"
                icon={<XCircleIcon className="w-7 h-7" />}
              />

              <StatCard
                title="Customers"
                value={customerCount}
                color="#9333ea"
                icon={<UsersIcon className="w-7 h-7" />}
              />

            </div>

            {/* License Header */}
            <div className="flex items-end justify-between mb-8 mt-8" >

  <div>

    <h2 className="text-3xl font-bold">
      License Management
    </h2>

    <p className="text-slate-500 mt-1">
      Manage all customer licenses.
    </p>

  </div>

  <div className="flex items-center gap-4">

    <div className="w-72">

      <Input
  placeholder="Search licenses..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
    </div>

    <Button
  onClick={() => setOpenModal(true)}
>
  + Create License
</Button>

  </div>

</div>

            {/* Table */}
<LicenseTable
  licenses={licenses}
  onDelete={setDeleteId}
  search={search}
  onEdit={setEditLicense}
  onView={setViewLicense}
/>
            <Modal
  open={openModal}
  title="Create License"
  onClose={() => setOpenModal(false)}
>

  <div className="grid grid-cols-2 gap-5">

  <Input
  label="Customer Name"
  placeholder="John Smith"
  value={customer}
  onChange={(e) => setCustomer(e.target.value)}
/>

<Input
  label="Email"
  placeholder="john@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

  <div>

  <label className="block mb-2 text-sm font-semibold text-slate-700">
    License Plan
  </label>

  <select
    value={plan}
    onChange={(e) =>
      setPlan(
        e.target.value as
          | "Lifetime"
          | "1 Year"
          | "6 Months"
          | "3 Months"
      )
    }
    className="
      w-full
      h-11
      rounded-xl
      border
      border-slate-300
      px-4
      outline-none
      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-100
    "
  >
    <option>Lifetime</option>
    <option>1 Year</option>
    <option>6 Months</option>
    <option>3 Months</option>
  </select>

</div>


</div>

<div className="mt-8 flex justify-end gap-3">

  <Button
    variant="outline"
    onClick={() => setOpenModal(false)}
  >
    Cancel
  </Button>

 <Button
  onClick={handleSaveLicense}
>
  Save License
</Button>

</div>

</Modal>


<Modal
  open={deleteId !== null}
  title="Delete License"
  onClose={() => setDeleteId(null)}
>

  <p className="text-slate-600">

    Are you sure you want to delete this license?

  </p>

  <div className="flex justify-end gap-3 mt-8">

    <Button
      variant="outline"
      onClick={() => setDeleteId(null)}
    >
      Cancel
    </Button>

    <Button
      onClick={async () => {

  if (!deleteId) return;

  try {

    await deleteLicense(deleteId);

    await loadLicenses();

    setDeleteId(null);

  } catch (err) {

    console.error(err);

  }

}}
    >
      Delete
    </Button>

  </div>

</Modal>


<Modal
  open={viewLicense !== null}
  title="License Details"
  onClose={() => setViewLicense(null)}
>

  {viewLicense && (

    <div className="grid grid-cols-2 gap-5">

      <Info
        title="License Key"
        value={viewLicense.licenseKey}
      />

      <Info
        title="Status"
        value={viewLicense.status}
      />

      <Info
        title="Customer"
        value={viewLicense.customer}
      />

      <Info
        title="Email"
        value={viewLicense.email}
      />

      <Info
        title="License Plan"
        value={viewLicense.plan}
      />

      <Info
        title="Expiry"
        value={viewLicense.expiry}
      />

      <Info
        title="Device"
        value={viewLicense.device}
      />

    </div>

  )}

</Modal>




<Modal
  open={editLicense !== null}
  title="Edit License"
  onClose={() => setEditLicense(null)}
>

  {editLicense && (

    <div className="space-y-5">

      <Input
        label="Customer Name"
        value={editLicense.customer}
        onChange={(e)=>
          setEditLicense({
            ...editLicense,
            customer:e.target.value
          })
        }
      />

      <Input
        label="Email"
        value={editLicense.email}
        onChange={(e)=>
          setEditLicense({
            ...editLicense,
            email:e.target.value
          })
        }
      />

      <div>

        <label className="block mb-2 text-sm font-semibold">
          License Plan
        </label>

        <select
          value={editLicense.plan}
          onChange={(e)=>
            setEditLicense({
              ...editLicense,
              plan:e.target.value as License["plan"],
            })
          }
          className="w-full h-11 rounded-xl border border-slate-300 px-4"
        >
          <option>Lifetime</option>
          <option>1 Year</option>
          <option>6 Months</option>
          <option>3 Months</option>
        </select>

      </div>

      <div className="flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={()=>setEditLicense(null)}
        >
          Cancel
        </Button>

        <Button
       onClick={async () => {

  if (!editLicense) return;

  try {

    const result = await updateLicense(
      editLicense.id,
      {
        customer: editLicense.customer,
        email: editLicense.email,
        plan: editLicense.plan,
        expiry: calculateExpiry(editLicense.plan),
      }
    );

    if (result.success) {

      await loadLicenses();

      setEditLicense(null);

    } else {

      alert(result.message);

    }

  } catch (err) {

    console.error(err);

    alert("Update Failed");

  }

}}
        >
          Save Changes
        </Button>

      </div>

    </div>

  )}

</Modal>





          </div>

        </main>

      </div>

    </div>
  );
}


function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (

    <div className="bg-slate-50 rounded-xl p-4">

      <div className="text-sm text-slate-500">
        {title}
      </div>

      <div className="font-semibold mt-2 break-all">
        {value}
      </div>

    </div>

  );
}