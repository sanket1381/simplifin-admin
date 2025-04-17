import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/SignIn";
import KycRequests from "../pages/KycList";
import Folios from "../pages/Folios";
import InvestmentAccounts from "../pages/InvestmentAccounts";
import Investors from "../pages/Investors";
import BankVerifications from "../pages/bankVerificationsList";
import UserKycDetails from "../pages/viewkycDetails";
import UserBankDetails from "../pages/viewBankVerificationDetails";
import BankMandatesList from "../pages/bankMandatesList";
import BankMandateDetails from "../pages/viewBankMandateDetails";
import PaymentList from "../pages/paymentList";
import PurchasesList from "../pages/purchasesList";
import PurchasePlanList from "../pages/purchasePlanList";
import RedeemptionsList from "../pages/redemptionsList";
import RedemptionPlanList from "../pages/redemptionPlanList";
import PurchasePlanDetails from "../pages/viewPurchasePlanDetails";
import PurchaseDetails from "../pages/viewPurchaseDetails";
import RedemptionDetails from "../pages/viewRedemptionDetails";

const routes = [
  {
    path: "/signin",
    element: <SignInForm />,
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
        element: <Navigate to="/folios" replace />,
      },
      {
        path: "folios", // full path becomes /admin/folios
        element: <Folios />,
      },
      {
        path: "investment-accounts", // full path becomes /admin/investment-accounts
        element: <InvestmentAccounts />,
      },
      {
        path: "investors", // full path becomes /admin/investors
        element: <Investors />,
      },
      {
        path: "kyc-requests", // full path becomes /admin/kyc-requests
        element: <KycRequests />,
      },
      {
        path: "/bankAccount-verifications", // full path becomes /admin/bank-account-verifications
        element: <BankVerifications />,
      },
      {
        path: "kyc-details/:id", // full path becomes /admin/kyc-details/:id
        element: <UserKycDetails />,
      },
      {
        path: "bank-details/:id", // full path becomes /admin/bank-details/:id
        element: <UserBankDetails />,
      },
      {
        path: "bank-mandates", // full path becomes /admin/bank-mandates
        element: <BankMandatesList />,
      },
      {
        path: "mandate-details/:id", // full path becomes /admin/mandate-details/:id
        element: <BankMandateDetails />,
      },
      {
        path: "payments", // full path becomes /admin/payments
        element: <PaymentList />,
      },
      {
        path: "purchases", // full path becomes /admin/purchases
        element: <PurchasesList />,
      },
      {
        path: "purchase-details/:id", // full path becomes /admin/purchase-details/:id
        element: <PurchaseDetails />,
      },
      {
        path: "purchase-plans", // full path becomes /admin/purchase-plans
        element: <PurchasePlanList />,
      },
      {
        path: "purchase-plan-details/:id", // full path becomes /admin/purchase-plan-details/:id
        element: <PurchasePlanDetails />,
      },
      {
        path: "redemptions", // full path becomes /admin/redemptions
        element: <RedeemptionsList />,
      },
      {
        path: "redemption-details/:id", // full path becomes /admin/redemptions
        element: <RedemptionDetails />,
      },
      {
        path: "redemption-plans", // full path becomes /admin/redemption-plans
        element: <RedemptionPlanList />,
      },
    ],
  },
];

export default routes;
