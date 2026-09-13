"use client";

/**
 * Convert an array of objects to CSV format and trigger a download.
 */
export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) {
    alert("No data to export");
    return;
  }

  // Determine columns: use provided columns or derive from first object
  const cols =
    columns ||
    (Object.keys(data[0]).map((k) => ({ key: k as keyof T, label: k })));

  // Build CSV rows
  const header = cols.map((c) => escapeCSV(c.label)).join(",");
  const rows = data.map((item) =>
    cols
      .map((c) => escapeCSV(String(item[c.key] ?? "")))
      .join(",")
  );
  const csv = [header, ...rows].join("\n");

  // Create and trigger download
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeCSV(value: string): string {
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
