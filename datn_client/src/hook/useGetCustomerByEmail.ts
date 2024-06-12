import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { ICustomer } from "../models/ICustomer";

export const useGetCustomerByEmail = () => {
     const {
          data: customerInfo,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<ICustomer>({
          queryKey: ["getCustomerByEmail"],
          queryFn: async () => {
               const response = await customerService.getCustomerByEmail();
               console.log("response:", response)
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          customerInfo,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type CustomerHook = ReturnType<typeof useGetCustomerByEmail>;

export default useGetCustomerByEmail;
