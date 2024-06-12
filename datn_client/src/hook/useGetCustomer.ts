import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { ICustomer } from "../models/ICustomer";

export const useGetCustomer = () => {
     const {
          data: customer,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<ICustomer, Error>({
          queryKey: ["getCustomerById"],
          queryFn: async () => {
               const response = await customerService.getCustomer();
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          customer,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};

export default useGetCustomer;
