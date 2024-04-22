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
import Disease from "./disease.entity";

/**
 * A Disease.
 */
@Table
export default class VaccineDisease extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @BelongsTo(() => Vaccine)
    vaccine: Vaccine;

    @ForeignKey(() => Vaccine)
    @Column
    vaccineId: number;

    @BelongsTo(() => Disease)
    dissease: number;

    @ForeignKey(() => Disease)
    @Column
    disseaseId: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
