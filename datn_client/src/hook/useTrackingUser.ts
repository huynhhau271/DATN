import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { ICustomer } from "../models/ICustomer";

export const useTrackingUser = () => {
     const {
          data: tracking,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<ICustomer, Error>({
          queryKey: ["trackingUser"],
          queryFn: async () => {
               const response = await customerService.getCustomerTracking();
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          tracking,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};

export default useTrackingUser;
