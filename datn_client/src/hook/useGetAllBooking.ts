import { useQuery } from "@tanstack/react-query";
import { bookingService } from "../services/bookingService";
import { Booking } from "../models/IBooking";

export interface Bookings {
     bookings: Booking[];
     limit: number;
     page: number;
     totalPage: number;
}

export const useGetAllBooking = (
     page: number,
     limit: number,
     search?: string
) => {
     const {
          data: bookings,
          isLoading,
          isError,
          refetch,
          isFetching,
     } = useQuery<Bookings, Error>({
          queryKey: ["getAllStaff", page, limit, search],
          queryFn: async () => {
               const response = await bookingService.getAllBooking(
                    page,
                    limit,
                    search
               );
               return response;
          },
          refetchOnWindowFocus: false,
     });

     return {
          bookings,
          isLoading,
          isError,
          refetch,
          isFetching,
     };
};
export type StaffHook = ReturnType<typeof useGetAllBooking>;

export default useGetAllBooking;
