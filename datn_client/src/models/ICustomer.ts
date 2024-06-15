import { Booking } from "./IBooking";
import { IWard } from "./province.model";

export interface ICustomer {
     id: number;
     customerName?: string;

     customerDoB?: string | Date;

     gender?: boolean;

     dob?: Date;

     parentsName?: string;

     phone?: string;

     email?: string;

     wardId?: string;
     provinceId: string;
     districtId: string;
     ward: IWard;
     address?: string;
     bookings?: Booking[];
     CCCD: string;
}
