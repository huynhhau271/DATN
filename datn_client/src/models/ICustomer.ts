import { Booking } from "./IBooking";

export interface ICustomer {
     customerName?: string;

     customerDoB?: string | Date;

     gender?: boolean;

     dob?: Date;

     parentsName?: string;

     phone?: string;

     email?: string;

     wardId?: string;
     address?: string;
     bookings?: Booking[];
     CCCD: string;
}
