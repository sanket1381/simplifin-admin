import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/SignIn";
import KycRequests from "../pages/KycRequests";
import Folios from "../pages/Folios";
import InvestmentAccounts from "../pages/InvestmentAccounts";
import Investors from "../pages/Investors";
import BankVerifications from "../pages/BankVerifications";
import UserKycDetails from "../pages/kycDetails";
import UserBankDetails from "../pages/bankDetails";


const routes = [

  {
    path: "/signin",
    element: <SignInForm />
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/folios" replace />
      },
      {
        path: "folios", // full path becomes /admin/kyc-requests
        element: <Folios />,
      },
      {
        path: "investment-Accounts", // full path becomes /admin/kyc-requests
        element: <InvestmentAccounts />,
      },
      {
        path: "investors",
        element: <Investors />,
      },

      {
        path: "kyc-requests",
        element: <KycRequests />,
      },
      {
        path: "bankAccount-verifications",
        element: <BankVerifications />,
      },
      {
        path: "/kyc-details/:id",
        element: <UserKycDetails />,
      },
      {
        path: "/bank-details/:id",
        element: <UserBankDetails />,
      },

    ]
  }
];
export default routes;