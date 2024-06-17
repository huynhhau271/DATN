import { useQuery } from "@tanstack/react-query";
import { staffService } from "../services/staffService";
import { IUser } from "../models/user.model";

export interface Staffs {
     staffs: IUser[];
     limit: number;
     page: number;
     total: number;
}

export const useGetAllStaff = (page: number, limit: number, search: string) => {
     const {
          data: staffs,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Staffs, Error>({
          queryKey: ["getAllStaff", page, limit, search],
          queryFn: async () => {
               const response = await staffService.getAllStaff(
                    page,
                    limit,
                    search
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          staffs,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type StaffHook = ReturnType<typeof useGetAllStaff>;

export default useGetAllStaff;
