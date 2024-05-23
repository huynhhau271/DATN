import { IBookingPayload } from "../models/IBooking";
import baseRequest from "./baseRequest";

class BookingService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "booking";
     async Booking(payload: IBookingPayload[]) {
          const response = await baseRequest.post(this.BasseUrl, payload);
          return response.data;
     }
     async Confirm({ email, name, otp, dob }: any) {
          const response = await baseRequest.post(this.BasseUrl + "/confirm", {
               email,
               name,
               otp,
               dob,
          });
          return response.data;
     }
}

export const bookingService = new BookingService();
