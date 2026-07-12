import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { License } from "../types/license";

interface LicenseStore {
  licenses: License[];

  addLicense: (license: License) => void;

  deleteLicense: (id: string) => void;

  updateLicense: (
    id: string,
    data: Partial<License>
  ) => void;
}

export const useLicenseStore = create<LicenseStore>()(
  persist(
    (set) => ({

      licenses: [],

      addLicense: (license) =>
        set((state) => ({
          licenses: [license, ...state.licenses],
        })),

      deleteLicense: (id) =>
        set((state) => ({
          licenses: state.licenses.filter(
            (l) => l.id !== id
          ),
        })),

      updateLicense: (id, data) =>
        set((state) => ({
          licenses: state.licenses.map((l) =>
            l.id === id
              ? { ...l, ...data }
              : l
          ),
        })),

    }),
    {
      name: "licenses-storage",
    }
  )
);