/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BeforeCreate,
    BeforeUpdate,
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
import getHashPassword from "../utils/getHashPassword";
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
    @Column({ type: DataType.STRING })
    CCCD: string;

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
    @Unique
    @Column({ type: DataType.STRING })
    email?: string;

    @Column({ type: DataType.STRING })
    password?: string;

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

    @BeforeUpdate
    @BeforeCreate
    static async hashPassword(instance: Customer | Customer[]) {
        if (Array.isArray(instance)) {
            instance.map(async (i) => {
                return (i.password = await getHashPassword(i.password));
            });
        } else 
            instance.password = await getHashPassword(instance.password);
    }
}
