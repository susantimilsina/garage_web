import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import ErrorPage from "./ErrorPage/ErrorPage";
import SalesList from "./pages/SalesList/SalesList";
import SaleDetail from "./pages/SaleDetail/SaleDetail";

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
  return <RouterProvider router={router} />;
};

export default App;
