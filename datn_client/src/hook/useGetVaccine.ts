import { useQuery } from "@tanstack/react-query";
import { IVaccine } from "../models/vaccine.model";
import { vaccineService } from "../services/vaccineService";

export interface Vaccines {
     vaccines: IVaccine[];
     limit: number;
     page: number;
     totalPage: number;
}

export const useGetAllVaccine = (
     page: number,
     limit: number,
     search: string
) => {
     const {
          data: vaccines,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Vaccines, Error>({
          queryKey: ["getAllStaff", page, limit, search],
          queryFn: async () => {
               // chuyen thanh vaccine
               const response = await vaccineService.getAllVaccine(
                    page,
                    limit,
                    search
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          vaccines,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type StaffHook = ReturnType<typeof useGetAllVaccine>;

export default useGetAllVaccine;
