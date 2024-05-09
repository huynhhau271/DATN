/* eslint-disable @typescript-eslint/no-unused-vars */
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
    UpdatedAt,
} from "sequelize-typescript";
import User from "./user.entity";
import importDetail from "./importDetails.entity";

/**
 * A ImAndExWarehouse.
 */
@Table
export default class ImAndExWarehouse extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.DATE })
    date: Date;

    @Column({ type: DataType.STRING })
    type: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    staffId: number;

    @BelongsTo(() => User)
    staff: User;

    @ForeignKey(() => User)
    approve: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    approveId: number;

    @HasMany(() => importDetail)
    importDatails: importDetail[];
    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    updatedAt?: Date;
}
