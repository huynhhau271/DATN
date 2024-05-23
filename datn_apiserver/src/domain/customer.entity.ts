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
    Unique,
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

    @PrimaryKey
    @Column({ type: DataType.STRING })
    customerName?: string;

    @PrimaryKey
    @Column({ type: DataType.DATE })
    customerDoB?: Date;

    @Column({ type: DataType.BOOLEAN })
    gender?: boolean;

    @Unique
    @Column({ type: DataType.CHAR })
    trackingNumberId?: string;

    @Column({ type: DataType.STRING })
    parentsName?: string;

    @Column({ type: DataType.STRING })
    relation?: string;

    @Column({ type: DataType.CHAR })
    phone?: string;

    @PrimaryKey
    @Column({ type: DataType.STRING })
    email?: string;

    @Column({ type: DataType.STRING })
    address?: string;

    @ForeignKey(() => Wards)
    @Column({ type: DataType.CHAR })
    wardId?: string;

    @BelongsTo(() => Wards)
    ward?: Wards;

    @HasMany(() => Booking)
    bookings?: Booking[];
    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
