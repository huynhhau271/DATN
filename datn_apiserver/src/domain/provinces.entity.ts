/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import Districts from "./districts.entity";

/**
 * A Provinces.
 */
@Table
export default class Provinces extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Districts, "provinceId")
    districts: Districts[];
}
