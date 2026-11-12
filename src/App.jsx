import "./App.css";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import ErrorPage from "./ErrorPage/ErrorPage";

// Other pages load on demand, so the home page doesn't download their code
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./TermsAndConditions/TermsAndConditions"));
const SalesList = lazy(() => import("./pages/SalesList/SalesList"));
const SaleDetail = lazy(() => import("./pages/SaleDetail/SaleDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sales",
    element: <SalesList />,
  },
  {
    path: "/sale/:id",
    element: <SaleDetail />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/privacy-policy/",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/terms-and-conditions/",
    element: <TermsAndConditions />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
