import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions/TermsAndConditions";
import ErrorPage from "./ErrorPage/ErrorPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-and-conditions",
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
