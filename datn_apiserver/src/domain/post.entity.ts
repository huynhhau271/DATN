/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import User from "./user.entity";

/**
 * A Post.
 */
@Table
export default class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.TEXT })
    content: string;

    @Column({ type: DataType.STRING })
    picture: string;

    @Column({ type: DataType.DATE })
    submittedDate: any;

    @BelongsTo(() => User, "userId")
    user: User;
    @ForeignKey(() => User)
    userId: User;
}
