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
import Wards from "./wards.entity";
import Provinces from "./provinces.entity";

/**
 * A Districts.
 */
@Table
export default class Districts extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Wards, "districtsId")
    wards: Wards[];

    @BelongsTo(() => Provinces, "provinceId")
    province: Provinces;

    @ForeignKey(() => Provinces)
    @Column({ type: DataType.BIGINT })
    provinceId: number;
}
