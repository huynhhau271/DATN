import { ICustomer } from "./ICustomer";

export interface IBooking {
    id?: number;

    expectedDate: Date;

    statused: string;

    paymentSatus: boolean;

    vaccineId: number;

    userId?: number;

    customerId?: number;

    customer?: ICustomer;
}
export interface BookingPayload {
    expectedDate: Date;

    vaccineId: number;

    customerId?: number;

    customer: ICustomer;
}
