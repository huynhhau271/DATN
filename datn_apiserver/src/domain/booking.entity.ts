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

    @Column({ type: DataType.STRING })
    createdBy?: string;

    @Column({ type: DataType.DATE })
    expectedDate: any;

    @Column({ type: DataType.STRING })
    statused: boolean;

    @Column({ type: DataType.STRING })
    customerName: string;

    @Column({ type: DataType.DATE })
    customerDoB: Date;

    @Column({ type: DataType.BOOLEAN })
    gender: boolean;

    @Column({ type: DataType.STRING })
    customerAddress: string;

    @Column({ type: DataType.STRING })
    contactName: string;

    @Column({ type: DataType.STRING })
    familyRelationship: string;

    @Column({
        type: DataType.STRING,
        validate: {
            min: 10,
            max: 10,
        },
    })
    contactPhone: string;

    @ForeignKey(() => Vaccine)
    @Column({ type: DataType.BIGINT })
    vaccineId: number;

    @ForeignKey(() => Wards)
    @Column({ type: DataType.BIGINT })
    wardId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    userId: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
