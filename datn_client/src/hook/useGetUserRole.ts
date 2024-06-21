import { useQuery } from "@tanstack/react-query";
import { IUser } from "../models/user.model";
import { staffService } from "../services/staffService";

export const useGetUserRole = (role = "Nhân Viên") => {
     const {
          data: staffs,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IUser[], Error>({
          queryKey: ["getStaff"],
          queryFn: async () => await staffService.getStaff(role),
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
