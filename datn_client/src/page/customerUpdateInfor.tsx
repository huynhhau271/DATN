import { useAuthContext } from "../contexts/authContext";
import ChangecustomerForm from "../forms/changInforCustomerForm";
import { ICustomer } from "../models/ICustomer";

export const CustomerUpdateInfo = () => {
     const { userLogin } = useAuthContext();
     return (
          <div className="h-full">
               <ChangecustomerForm idCus={(userLogin as ICustomer).id} />
          </div>
     );
};
