import { MEDIA_BASE_URL } from "../common/constants";

/**
 * Get image URL from attachment object
 */
const getImageUrl = (attachment) => {
  const url = attachment?.file ?? attachment?.url ?? attachment?.image ?? attachment?.thumbnail;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${MEDIA_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Get first image URL from attachments
 */
export const getSaleThumbnail = (sale) => {
  const attachments =
    sale?.attachments ??
    sale?.images ??
    sale?.photos ??
    sale?.media ??
    [];
  const arr = Array.isArray(attachments) ? attachments : [attachments].filter(Boolean);
  const first = arr[0];
  return first ? getImageUrl(first) : null;
};

/**
 * Get all image URLs from sale attachments
 */
export const getSaleImages = (sale) => {
  const attachments =
    sale?.attachments ??
    sale?.images ??
    sale?.photos ??
    sale?.media ??
    [];
  const arr = Array.isArray(attachments) ? attachments : [attachments].filter(Boolean);
  return arr.map(getImageUrl).filter(Boolean);
};

/**
 * Format address from location object (API snake_case or camelCase)
 */
export const formatAddress = (location) => {
  if (!location || typeof location !== "object") return "Address not specified";
  const loc = location;
  const parts = [
    loc.address_line ?? loc.addressLine,
    loc.sub_throughfare ?? loc.subThroughfare,
    loc.throughfare,
    loc.sub_locality ?? loc.subLocality,
    loc.locality,
    loc.sub_admin_area ?? loc.subAdminArea,
    loc.admin_area ?? loc.adminArea,
    loc.zip_code ?? loc.zipCode,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "Address not specified";
};

/**
 * Convert 24h time string (HH:mm:ss or HH:mm) to 12h AM/PM format
 */
const formatTime12h = (timeStr) => {
  if (!timeStr) return "";
  const [h, m = 0] = timeStr.split(":").map(Number);
  const hour = h % 12 || 12;
  const ampm = h < 12 ? "AM" : "PM";
  const min = String(m).padStart(2, "0");
  return `${hour}:${min} ${ampm}`;
};

/**
 * Extract time slots from sale (handles various API shapes)
 */
const getTimeSlots = (sale) => {
  const slots =
    sale?.available_time_slots ??
    sale?.availableTimeSlots ??
    sale?.time_slots ??
    sale?.timeSlots ??
    sale?.schedule ??
    sale?.schedules ??
    [];
  if (!Array.isArray(slots)) {
    return [slots].filter(Boolean);
  }
  return slots;
};

/**
 * Format ALL time slots for detail view (each slot with date + time)
 * Returns array of formatted strings, e.g. ["Apr 18, 2026 8:00 AM – 2:00 PM", "Apr 19, 2026 9:00 AM – 3:00 PM"]
 */
export const formatAllTimeSlots = (slotsOrSale) => {
  const slots = Array.isArray(slotsOrSale)
    ? slotsOrSale
    : getTimeSlots(slotsOrSale ?? {});
  if (!slots?.length) return [];
  const sorted = [...slots].sort(
    (a, b) =>
      new Date(a?.date ?? a?.start_date ?? 0) -
      new Date(b?.date ?? b?.start_date ?? 0)
  );
  const format = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  return sorted.map((slot) => {
    const date = slot?.date ?? slot?.start_date;
    if (!date) return null;
    const startTime = formatTime12h(slot?.start_time);
    const endTime = formatTime12h(slot?.end_time);
    const timeStr = [startTime, endTime].filter(Boolean).join(" – ");
    return timeStr ? `${format(date)} ${timeStr}` : format(date);
  }).filter(Boolean);
};

/**
 * Format date range from available time slots (compact, for cards)
 */
export const formatSaleDates = (slotsOrSale) => {
  const slots = Array.isArray(slotsOrSale)
    ? slotsOrSale
    : getTimeSlots(slotsOrSale ?? {});
  if (!slots?.length) return "Dates not specified";
  const sorted = [...slots].sort(
    (a, b) =>
      new Date(a?.date ?? a?.start_date ?? 0) -
      new Date(b?.date ?? b?.start_date ?? 0)
  );
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const startDate = first?.date ?? first?.start_date;
  const endDate = last?.date ?? last?.end_date;
  if (!startDate) return "Dates not specified";
  const format = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const startTime = formatTime12h(first?.start_time);
  const endTime = formatTime12h(first?.end_time);
  const timeStr = [startTime, endTime].filter(Boolean).join(" – ");
  if (startDate === endDate || !endDate) {
    return timeStr ? `${format(startDate)} ${timeStr}` : format(startDate);
  }
  return `${format(startDate)} – ${format(endDate)}`;
};

/**
 * Check if a sale is expired (is_expired === true OR status === 'Expired')
 */
export const isSaleExpired = (sale) => {
  if (!sale) return false;
  if (sale.is_expired === true) return true;
  const status = String(sale.status ?? "").toLowerCase();
  return status === "expired";
};

/**
 * Get default date range: last 10 days from today
 * Returns { startDate, endDate } as YYYY-MM-DD strings
 */
export const getDefaultDateRange = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 10);
  const fmt = (d) => d.toISOString().split("T")[0];
  return {
    startDate: fmt(start),
    endDate: fmt(today),
  };
};
