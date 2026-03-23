import {
  API_BASE_URL,
  GARAGE_YARD_SALES_LIST,
  GARAGE_YARD_SALES_BY_ID,
} from "../common/constants";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

/**
 * Fetch list of garage and yard sales with server-side filters
 * @param {Object} params - Query params: start_date, end_date, q, page, per_page, type
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export const getSalesList = async (params = {}) => {
  const cleanParams = {};
  if (params.start_date) cleanParams.start_date = params.start_date;
  if (params.end_date) cleanParams.end_date = params.end_date;
  if (params.q?.trim()) cleanParams.q = params.q.trim();
  if (params.type && params.type !== "All") cleanParams.type = params.type;
  cleanParams.page = params.page ?? 1;
  cleanParams.per_page = params.per_page ?? 10;

  const searchParams = new URLSearchParams(cleanParams).toString();
  const url = `${buildUrl(GARAGE_YARD_SALES_LIST)}?${searchParams}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch sales: ${response.status}`);
  }

  const json = await response.json();
  const data = Array.isArray(json.data) ? json.data : json.results ?? json.data ?? [];
  const pagination = json.pagination ?? {
    current_page: 1,
    total_pages: 1,
    total: data.length,
    per_page: 10,
  };

  return { data, pagination };
};

/**
 * Fetch a single sale by ID
 * @param {number|string} id - Sale ID
 * @returns {Promise<Object>}
 */
export const getSaleById = async (id) => {
  const response = await fetch(buildUrl(GARAGE_YARD_SALES_BY_ID(id)));

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch sale: ${response.status}`);
  }

  const json = await response.json();
  // Handle wrapped responses: { data: {...} } or { result: {...} }
  return json?.data ?? json?.result ?? json;
};
