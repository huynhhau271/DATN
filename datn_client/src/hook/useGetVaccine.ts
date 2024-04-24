import { useQuery } from "@tanstack/react-query";
import { Vaccine } from "../models/vaccine.model";
import { staffService } from "../services/staffService";

export interface Vaccines {
  vaccines: Vaccine[];
  limit: number;
  page: number;
  totalPage: number;
}

export const useGetAllVaccine = (
  page: number,
  limit: number,
  search: string,
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
      const response = await staffService.getAllStaff(page, limit, search);
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

