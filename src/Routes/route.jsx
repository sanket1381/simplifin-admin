import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/signIn";
import KycRequests from "../pages/kycList";
import FoliosList from "../pages/foliosList";
import BankVerifications from "../pages/bankVerificationsList";
import UserKycDetails from "../pages/viewkycDetails";
import UserBankDetails from "../pages/viewBankVerificationDetails";
import BankMandatesList from "../pages/bankMandatesList";
import BankMandateDetails from "../pages/viewBankMandateDetails";
import PurchasesList from "../pages/purchasesList";
import PurchasePlanList from "../pages/purchasePlanList";
import RedeemptionsList from "../pages/redemptionsList";
import RedemptionPlanList from "../pages/redemptionPlanList";
import PurchasePlanDetails from "../pages/viewPurchasePlanDetails";
import PurchaseDetails from "../pages/viewPurchaseDetails";
import RedemptionDetails from "../pages/viewRedemptionDetails";
import RedemptionPlanDetails from "../pages/viewRedemptionPlanDetails";

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
        path: "folios", 
        element: <FoliosList />,
      },
     
      {
        path: "kyc-requests", 
        element: <KycRequests />,
      },
      {
        path: "/bankAccount-verifications", 
        element: <BankVerifications />,
      },
      {
        path: "kyc-details/:id", 
        element: <UserKycDetails />,
      },
      {
        path: "bank-details/:id", 
        element: <UserBankDetails />,
      },
      {
        path: "bank-mandates", 
        element: <BankMandatesList />,
      },
      {
        path: "mandateDetails/:id", 
        element: <BankMandateDetails />,
      },
    
      {
        path: "purchases", 
        element: <PurchasesList />,
      },
      {
        path: "purchase-details/:id", 
        element: <PurchaseDetails />,
      },
      {
        path: "purchase-plans", 
        element: <PurchasePlanList />,
      },
      {
        path: "purchase-plan-details/:id", 
        element: <PurchasePlanDetails />,
      },
      {
        path: "redemptions", 
        element: <RedeemptionsList />,
      },
      {
        path: "redemption-details/:id", 
        element: <RedemptionDetails />,
      },
      {
        path: "redemption-plans", 
        element: <RedemptionPlanList />,
      },
      {
        path: "redemptionplan-details/:id", 
        element: <RedemptionPlanDetails />,
      },
    ],
  },
];

export default routes;
