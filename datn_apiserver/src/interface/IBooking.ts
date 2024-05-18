import { ICustomer } from "./ICustomer";

export interface IBooking {
    id?: number;

    expectedDate: Date;

    statused: string;

    vaccineId: number;

    userId: number;

    customerId?: number;

    customer?: ICustomer;
}
