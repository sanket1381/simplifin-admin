import AdminLayout from "../layout/AdminLayout";
import SignInForm from "../pages/SignIn";
import KycRequests from "../pages/KycRequests";
import Folios from "../pages/Folios";
import InvestmentAccounts from "../pages/InvestmentAccounts";
import Investors from "../pages/Investors";
import BankVerifications from "../pages/BankVerifications";
import UserBankDetails from "../pages/userBankDetails";


const routes=[

{
    path:"/signin",
    element:<SignInForm/>
},
{
    path: "/",
    element: <AdminLayout />, 
    children: [
      {
        index: true, 
        element: <div>Welcome to the Admin Panel</div>
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
        path: "/details/:id", 
        element: <UserBankDetails />,
      },

    ]
  }
];
export default routes;