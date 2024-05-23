import { useQuery } from "@tanstack/react-query";
import { IVaccine } from "../models/vaccine.model";
import { vaccineService } from "../services/vaccineService";

export const useGetAllVaccineByMothOld = (mothOld: number) => {
     const {
          data: vaccines,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<IVaccine[], Error>({
          queryKey: ["getALlVaccineByMothOld", mothOld],
          queryFn: async () => {
               const response = await vaccineService.getAllVaccineByMothOld(
                    mothOld
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

export default useGetAllVaccineByMothOld;
