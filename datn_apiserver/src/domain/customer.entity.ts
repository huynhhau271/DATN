/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Wards from "./wards.entity";
import Booking from "./booking.entity";
/**
 * A Booking.
 */
@Table({
    timestamps: true,
})
export default class Customer extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    customerName: string;

    @Column({ type: DataType.DATE })
    customerDoB: Date;

    @Column({ type: DataType.BOOLEAN })
    gender: boolean;

    @PrimaryKey
    @Column({ type: DataType.CHAR })
    trackingNumberId: string;

    @Column({
        type: DataType.DATE,
    })
    dob: Date;

    @Column({ type: DataType.STRING })
    parentsName: string;

    @Column({ type: DataType.CHAR })
    phone: string;

    @Column({ type: DataType.CHAR })
    email: string;

    @ForeignKey(() => Wards)
    @Column({ type: DataType.CHAR })
    wardId?: string;

    @BelongsTo(() => Wards)
    ward: Wards;

    @HasMany(() => Booking)
    bookings: Booking[];
    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
