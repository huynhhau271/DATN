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
import Booking from "./booking.entity";
import Wards from "./wards.entity";

@Table({
    timestamps: true,
})
export default class NurseStaff extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    phone?: string;

    @Column({ type: DataType.STRING })
    fullName?: string;

    @Column({ type: DataType.BOOLEAN })
    gender?: boolean;

    @Column({ type: DataType.DATE })
    dob?: Date;

    @Column({ type: DataType.CHAR })
    CCCD?: string;

    @Column({ type: DataType.STRING })
    avatar?: string;

    @HasMany(() => Booking, "bookingId")
    bookings?: Booking[];

    @ForeignKey(() => Wards)
    @Column({ type: DataType.CHAR })
    wardId?: string;

    @BelongsTo(() => Wards)
    ward: Wards;

    @Column
    @ForeignKey(() => NurseStaff)
    createdBy?: number;

    @Column
    @ForeignKey(() => NurseStaff)
    updatedBy?: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
