export interface License {
  id: string;

  licenseKey: string;

  customer: string;

  email: string;

  plan: "Lifetime" | "1 Year" | "6 Months" | "3 Months";

  issueDate: string;

  expiry: string;

  device: string;

  status: "Unused" | "Active" | "Expired";

  lastCheck: string;

  notes: string;
}