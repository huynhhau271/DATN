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

    @Column({ type: DataType.INTEGER })
    distance: number; // * moth

    @ForeignKey(() => Vaccine)
    vaccineId: number;

    @BelongsTo(() => Vaccine)
    vaccine: Vaccine;
}
