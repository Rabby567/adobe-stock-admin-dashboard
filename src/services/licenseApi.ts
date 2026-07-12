import type { License } from "../types/license";

const API_URL =
  `${import.meta.env.VITE_API_URL}/licenses`;

// ===============================
// Get All Licenses
// ===============================

export async function getLicenses() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch licenses");
  }

  return await res.json();
}

// ===============================
// Create License
// ===============================

export async function createLicense(data: License) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create license");
  }

  return await res.json();
}

// ===============================
// Update License
// ===============================

export async function updateLicense(
  id: string,
  data: Partial<License>
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update license");
  }

  return await res.json();
}

// ===============================
// Delete License
// ===============================

export async function deleteLicense(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete license");
  }

  return await res.json();
}