import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { ICustomer } from "../models/ICustomer";

export const useGetCustomerById = (id: number) => {
     const {
          data: customer,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<ICustomer, Error>({
          queryKey: ["getCustomerById", id],
          queryFn: async () => {
               const response = await customerService.getCustomerById(id);
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

export default useGetCustomerById;
