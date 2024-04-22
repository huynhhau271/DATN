/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import Booking from "./booking.entity";
import Districts from "./districts.entity";
import User from "./user.entity";

/**
 * A Wards.
 */
@Table
export default class Wards extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    name?: string;

    @HasMany(() => Booking)
    bookings?: Booking[];

    @HasMany(() => User)
    users?: User[];

    @BelongsTo(() => Districts)
    district?: Districts;

    @ForeignKey(() => Districts)
    @Column({ type: DataType.BIGINT })
    districtId?: number;
}
