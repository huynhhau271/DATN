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
import importDetail from "./importDetails.entity";

/**
 * A LotNo.
 */
@Table
export default class LotNo extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
    })
    id: number;

    @Column({ type: DataType.STRING })
    batchCode: string;

    @Column({ type: DataType.STRING })
    madeInCountry: string;

    @Column({ type: DataType.DATE })
    mfgDate: Date;

    @Column({ type: DataType.DATE })
    expDate: Date;

    @HasMany(() => importDetail)
    import: importDetail[];
}
