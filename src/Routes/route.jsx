import MFHoldings from "../pages/mfHoldings";
import ViewGoldRedeemDetails from "../pages/viewGoldRedeemDetails";
import ViewGoldSipDetails from "../pages/viewGoldSipDetails";
import ViewGoldFdDetails from "../pages/viewGoldFdDetails";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/signIn";
import KycRequests from "../pages/kycList";
import FoliosList from "../pages/foliosList";
import Folios from "../pages/Folios";
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
import AddressDetailsList from "../pages/addressDetailsList";
import ViewAddressDetails from "../pages/viewAddressDetails";
import UserDetailsList from "../pages/userDetailsList";
import ViewUserDetails from "../pages/viewUserDetails";
import GoldPurchaseList from "../pages/goldPurchaseList";
import GoldRedeemList from "../pages/goldRedeemList";
import GoldSipList from "../pages/goldSipList";
import GoldFdList from "../pages/goldFdList";
import ViewGoldPurchaseDetails from "../pages/viewGoldPurchaseDetails";
import GoldHoldings from "../pages/goldHoldings";

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
        element: <Navigate to="/user-details" replace />,
      },
      {
        path: "folios", 
        element: <FoliosList />,
      },
      {
        path: "folios/details",
        element: <Folios />,
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
        path: "user-details",
        element: <UserDetailsList />,
      },
      {
        path: "user-details/:id",
        element: <ViewUserDetails />,
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
        path: "address-details",
        element: <AddressDetailsList />,
      },
      {
        path: "address-details/:id", 
        element: <ViewAddressDetails />,
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
      {
        path: "gold-holdings",
        element: <GoldHoldings />,
      },
      {
        path: "gold-purchase",
        element: <GoldPurchaseList />,
      },
      {
        path: "gold-purchase-details/:id",
        element: <ViewGoldPurchaseDetails />,
      },
      {
        path: "gold-redeem-details/:id",
        element: <ViewGoldRedeemDetails />,
      },
      {
        path: "gold-sip-details/:id",
        element: <ViewGoldSipDetails />,
      },
      {
        path: "gold-fd-details/:id",
        element: <ViewGoldFdDetails />,
      },
      {
        path: "gold-redeem",
        element: <GoldRedeemList />,
      },
      {
        path: "gold-sip",
        element: <GoldSipList />,
      },
      {
        path: "gold-fd",
        element: <GoldFdList />,
      },
      {
        path: "mf-holdings",
        element: <MFHoldings />,
      },
    ],
  },
];

export default routes;
