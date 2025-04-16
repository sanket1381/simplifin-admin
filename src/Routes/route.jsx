import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/SignIn";
import KycRequests from "../pages/KycList";
import Folios from "../pages/Folios";
import InvestmentAccounts from "../pages/InvestmentAccounts";
import Investors from "../pages/Investors";
import BankVerifications from "../pages/BankVerifications";
import UserKycDetails from "../pages/viewkycDetails";
import UserBankDetails from "../pages/bankDetails";
import BankMandatesList from "../pages/bankMandatesList";
import BankMandateDetails from "../pages/viewBankMandateDetails";
import PaymentList from "../pages/paymentList";
import PurchasesList from "../pages/purchasesList";
import PurchasePlanList from "../pages/purchasePlanList";
import RedeemptionsList from "../pages/redemptionsList";
import RedemptionPlanList from "../pages/redemptionPlanList";


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
      {
        path: "/bank-mandates",
        element: <BankMandatesList />,
      },

      {
        path: "/mandateDetails/:id",
        element: < BankMandateDetails />,
      },
      {
        path: "/payments",
        element: <PaymentList />,
      },
      {
        path: "/purchases",
        element: <PurchasesList />,
      },
      {
        path: "purchase-plans",
        element: <PurchasePlanList />,
      },
      {
        path: "/redemptions",
        element: <RedeemptionsList />,
      },
      {
        path: "/redemption-plans",
        element: <RedemptionPlanList />,
      },
      

    ]
  }
];
export default routes;