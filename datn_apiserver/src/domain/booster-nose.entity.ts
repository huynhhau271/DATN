/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
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
import User from "./user.entity";

/**
 * A BoosterNose.
 */
@Table
export default class BoosterNose extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.INTEGER })
    noseNumber: number;

    @Column({ type: DataType.DATE })
    noDate: string;

    @ForeignKey(() => Vaccine)
    vaccineId: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
