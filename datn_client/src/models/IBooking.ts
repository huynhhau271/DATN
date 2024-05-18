import { ICustomer } from "./ICustomer";

export interface IBooking {
    id?: number;

    createdBy?: string;

    expectedDate: Date;

    bookingDate: Date;

    statused: string;

    vaccineId: number;

    userId: number;

    nurseStaffId: number;

    customerId: number;

    customer: ICustomer;
}
