import { ICustomer } from "./ICustomer";

export interface IBooking {
     expectedDate: Date;

     customerDoB?: Date;

     vaccineId: number;

     customerName?: string;

     gender?: boolean;

     parentsName?: string;

     relation?: string;

     phone?: string;

     email?: string;

     wardId?: string;

     address?: string;
}
export interface IBookingPayload {
     vaccineId: number;
     expectedDate: Date;
     customerId?: number;
     customer?: ICustomer;
}
