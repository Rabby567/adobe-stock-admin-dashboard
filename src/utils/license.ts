export function generateLicenseKey() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const random = () =>

    Array.from(
      { length: 4 },
      () =>
        chars[
          Math.floor(
            Math.random() * chars.length
          )
        ]
    ).join("");

  return `${random()}-${random()}-${random()}-${random()}`;

}

export function calculateExpiry(
  plan: string
) {

  if (plan === "Lifetime")
    return "Never";

  const date = new Date();

  switch (plan) {

    case "1 Year":
      date.setFullYear(
        date.getFullYear() + 1
      );
      break;

    case "6 Months":
      date.setMonth(
        date.getMonth() + 6
      );
      break;

    case "3 Months":
      date.setMonth(
        date.getMonth() + 3
      );
      break;

  }

  return date
    .toISOString()
    .split("T")[0];

}