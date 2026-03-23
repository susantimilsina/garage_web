import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import SaleCard from "../../components/SaleCard/SaleCard";
import SeoHead from "../../components/SeoHead/SeoHead";
import { getSalesList } from "../../api/garageYardApi";
import { getDefaultDateRange } from "../../utils/saleHelpers";

const TYPE_FILTERS = ["All", "Garage", "Yard", "Estate"];
const PER_PAGE = 10;

const SaleCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-pulse">
    <div className="aspect-video bg-brand-light-orange/30" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-brand-light-orange/30 rounded w-3/4" />
      <div className="h-4 bg-brand-light-orange/30 rounded w-1/2" />
      <div className="h-4 bg-brand-light-orange/30 rounded w-full" />
    </div>
  </div>
);

const formatDateForApi = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [startDate, setStartDate] = useState(() => getDefaultDateRange().startDate);
  const [endDate, setEndDate] = useState(() => getDefaultDateRange().endDate);
  const [typeFilter, setTypeFilter] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [searchDebounced, startDate, endDate, typeFilter]);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, pagination: pag } = await getSalesList({
        q: searchDebounced,
        start_date: formatDateForApi(startDate) || undefined,
        end_date: formatDateForApi(endDate) || undefined,
        type: typeFilter,
        page,
        per_page: PER_PAGE,
      });
      setSales(Array.isArray(data) ? data : []);
      setPagination(pag);
    } catch (err) {
      setError(err.message || "Failed to load sales");
      setSales([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [searchDebounced, startDate, endDate, typeFilter, page]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const totalPages = pagination?.total_pages ?? 0;
  const currentPage = pagination?.current_page ?? 1;
  const total = pagination?.total ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SeoHead
        title="Find Garage & Yard Sales Near You"
        description="Browse local garage and yard sales. Discover sales in your neighborhood. Find deals on furniture, electronics, toys, and more."
        path="/sales"
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Sales", url: "/sales" },
        ]}
      />
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Hero strip */}
          <div className="mb-10">
            <nav className="text-sm text-brand-light-text-color font-rethink mb-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-brand-blue">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-brand-title-color">Sales</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-title-color font-merriweather">
              Find Garage & Yard Sales
            </h1>
          </div>

          {/* Filters card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 min-w-[200px] px-4 py-2.5 border-2 border-gray-200 rounded-lg font-rethink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none"
                />
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <label className="text-sm text-brand-light-text-color font-rethink sm:sr-only">
                    Date range
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2.5 border-2 border-gray-200 rounded-lg font-rethink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none min-w-[140px]"
                    aria-label="From date"
                  />
                  <span className="text-brand-light-text-color hidden sm:inline">–</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || undefined}
                    className="px-4 py-2.5 border-2 border-gray-200 rounded-lg font-rethink focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none min-w-[140px]"
                    aria-label="To date"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {TYPE_FILTERS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-4 py-2 rounded-full font-medium font-rethink transition-colors ${
                      typeFilter === t
                        ? "bg-brand-blue text-white"
                        : "bg-brand-light-orange text-brand-brown hover:bg-brand-light-orange/80"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SaleCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20 bg-brand-light-orange/30 rounded-xl border-2 border-brand-light-orange">
              <p className="text-brand-red font-rethink mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-brand-blue text-white rounded-full font-bold font-rethink hover:bg-brand-blue/90"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && sales.length === 0 && (
            <div className="text-center py-20 bg-brand-light-border-green rounded-xl border-2 border-brand-light-green">
              <p className="text-brand-title-color font-rethink text-lg mb-2">
                No sales found
              </p>
              <p className="text-brand-light-text-color font-rethink text-sm">
                Try adjusting your search or filters. Check back later for new
                listings.
              </p>
            </div>
          )}

          {!loading && !error && sales.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sales.map((sale) => (
                  <SaleCard key={sale?.id} sale={sale} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                  <button
                    onClick={() => setPage(1)}
                    disabled={currentPage <= 1}
                    className="px-3 py-2 rounded-lg font-rethink font-medium bg-brand-light-orange text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-light-orange/80"
                    aria-label="First page"
                  >
                    &#171;
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 rounded-lg font-rethink font-medium bg-brand-light-orange text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-light-orange/80"
                  >
                    Previous
                  </button>
                  <span className="text-brand-light-text-color font-rethink px-4">
                    Page {currentPage} of {totalPages}
                    {total > 0 && ` (${total} total)`}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 rounded-lg font-rethink font-medium bg-brand-light-orange text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-light-orange/80"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-2 rounded-lg font-rethink font-medium bg-brand-light-orange text-brand-brown disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-light-orange/80"
                    aria-label="Last page"
                  >
                    &#187;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SalesList;
