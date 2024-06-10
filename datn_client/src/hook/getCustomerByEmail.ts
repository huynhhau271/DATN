import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";

export const useGetCustomerByInfo = (
     name: number,
     dob: number,
     email: string
) => {
     const {
          data: customer,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Error>({
          queryKey: ["getCustomerByEmail", name, dob, email],
          queryFn: async () => {
               const response = await customerService.getCustomerByInfo({
                    name,
                    dob,
                    email,
               });
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          diseases: customer,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type CustomerHook = ReturnType<typeof useGetCustomerByInfo>;

export default useGetCustomerByInfo;
