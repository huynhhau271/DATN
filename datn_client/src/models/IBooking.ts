import { ICustomer } from "./ICustomer";
import { IUser } from "./user.model";
import { IVaccine } from "./vaccine.model";

export interface IBookingForm {
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

     cccd: string;
}
export interface IBookingPayload {
     vaccineId: number;
     expectedDate: Date;
     customerId?: number;
     customer?: ICustomer;
}
export interface Booking {
     id:number;
     statused: string;
     vaccineId: number;
     vaccine: IVaccine;
     expectedDate: Date;
     customerId?: number;
     customer: ICustomer;
     paymentSatus: boolean;
     nurseStaff: IUser;
}
