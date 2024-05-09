import {
    AutoIncrement,
    BeforeCreate,
    BeforeUpdate,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from "sequelize-typescript";
import getHashPassword from "../utils/getHashPassword";
import Authority from "./authority.entity";
import Post from "./post.entity";
import Booking from "./booking.entity";
import Wards from "./wards.entity";
import ImAndExWarehouse from "./ImAndExWarehouse.entity";

@Table({
    timestamps: true,
})
export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    email?: string;

    @Unique
    @Column({
        type: DataType.STRING,
    })
    phone?: string;

    @Column({ type: DataType.BOOLEAN })
    activated?: boolean;

    @Column({ type: DataType.STRING })
    password?: string;

    @Column({ type: DataType.STRING })
    fullName?: string;

    @Column({ type: DataType.BOOLEAN })
    gender?: boolean;

    @Column({ type: DataType.DATE })
    dob?: Date;

    @Column({ type: DataType.CHAR })
    CCCD?: string;

    @Column({ type: DataType.STRING })
    avatar?: string;

    @HasMany(() => Post, "postId")
    posts?: Post[];

    @HasMany(() => Booking, "bookingId")
    bookings?: Booking[];

    @ForeignKey(() => Wards)
    @Column({ type: DataType.CHAR })
    wardId?: string;

    @BelongsTo(() => Wards)
    ward: Wards;

    @ForeignKey(() => Authority)
    @Column({ type: DataType.BIGINT })
    roleId?: number;

    @BelongsTo(() => Authority)
    role: Authority;

    @HasMany(() => ImAndExWarehouse, "staffId")
    importExport: ImAndExWarehouse[];

    @HasMany(() => ImAndExWarehouse, "approveId")
    approveImportExport: ImAndExWarehouse[];

    @Column
    @ForeignKey(() => User)
    createdBy?: number;

    @Column
    @ForeignKey(() => User)
    updatedBy?: number;

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;

    @BeforeUpdate
    @BeforeCreate
    static async hashPassword(instance: User | User[]) {
        if (Array.isArray(instance)) {
            instance.map(async (i) => {
                return (i.password = await getHashPassword(i.password));
            });
        } else instance.password = await getHashPassword(instance.password);
    }
}
