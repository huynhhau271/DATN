/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Vaccine from "./vaccine.entity";
import Wards from "./wards.entity";
import User from "./user.entity";
import NurseStaff from "./nurseStaff.entity";
import Customer from "./customer.entity";
/**
 * A Booking.
 */
@Table({
    timestamps: true,
})
export default class Booking extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.DATE })
    expectedDate: Date;

    @Column({ type: DataType.DATE })
    bookingDate: Date;

    @Column({ type: DataType.STRING })
    statused: string;

    @Column({ type: DataType.STRING })
    address: string;

    @ForeignKey(() => Vaccine)
    @Column({ type: DataType.BIGINT })
    vaccineId: number;

    @BelongsTo(() => Vaccine)
    vaccine: Vaccine;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    userId: number;

    @ForeignKey(() => NurseStaff)
    @Column({ type: DataType.BIGINT })
    nurseStaffId: number;

    @BelongsTo(() => NurseStaff)
    nurseStaff: NurseStaff;

    @ForeignKey(() => Customer)
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
