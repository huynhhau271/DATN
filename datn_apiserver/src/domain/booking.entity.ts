/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Vaccine from "./vaccine.entity";
import User from "./user.entity";
import Customer from "./customer.entity";
import HealtSheet from "./healtSheet.entity";
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

    @Column({ type: DataType.STRING })
    statused: string;

    @Column({ type: DataType.BOOLEAN })
    paymentSatus: boolean;

    @Column({ type: DataType.STRING })
    note: string;

    @Column({ type: DataType.STRING })
    confirmKey: string;

    @ForeignKey(() => Vaccine)
    @Column({ type: DataType.BIGINT })
    vaccineId: number;

    @BelongsTo(() => Vaccine)
    vaccine: Vaccine;

    @BelongsTo(() => User, "userId")
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    userId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    nurseStaffId: number;

    @BelongsTo(() => User, "nurseStaffId")
    nurseStaff: User;

    @ForeignKey(() => Customer)
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;

    @HasOne(() => HealtSheet)
    healtSheet: HealtSheet;
}
