import { useQuery } from "@tanstack/react-query";
import { IDisease } from "../models/disease.model";
import { diseaseService } from "../services/diseaseService";

interface Diseases {
     diseases: IDisease[];
     limit: number;
     page: number;
     totalPage: number;
}

export const useGetAllDisease = (
     page: number,
     limit: number,
     search: string
) => {
     const {
          data: diseases,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Diseases, Error>({
          queryKey: ["getAllDisease", page, limit, search],
          queryFn: async () => {
               const response = await diseaseService.getALlDisease(
                    page,
                    limit,
                    search
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          diseases,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type StaffHook = ReturnType<typeof useGetAllDisease>;

export default useGetAllDisease;
