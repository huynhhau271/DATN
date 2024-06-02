import { Booking } from "./IBooking";
import { IWard } from "./province.model";

export interface ICustomer {
     customerName: string;

     customerDoB: Date | string;

     gender: boolean;

     dob?: Date;

     parentsName?: string;

     phone?: string;

     email?: string;

     wardId?: string;

     ward: IWard;

     address?: string;

     bookings?: Booking[];

     CCCD: string;
}
