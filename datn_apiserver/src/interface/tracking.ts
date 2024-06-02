import { IBooking } from "./IBooking";

export interface Tracking {
    customerName: string;
    customerDob: string;
    booking: IBooking[];
}
