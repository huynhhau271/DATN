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
import ImAndExWarehouse from "./ImAndExWarehouse.entity";
import LotNo from "./lot-no.entity";

/**
 * A exportDetail.
 */
@Table
export default class exportDetail extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.INTEGER })
    quanlity: number;

    @Column({ type: DataType.STRING })
    unit: string;

    @ForeignKey(() => Vaccine)
    @Column({
        type: DataType.BIGINT,
    })
    vaccineId: number;

    @BelongsTo(() => Vaccine)
    vaccine: Vaccine;

    @ForeignKey(() => ImAndExWarehouse)
    @Column({
        type: DataType.BIGINT,
    })
    ballotId: number;

    @BelongsTo(() => ImAndExWarehouse)
    ballot: ImAndExWarehouse;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    updatedAt?: Date;
}
