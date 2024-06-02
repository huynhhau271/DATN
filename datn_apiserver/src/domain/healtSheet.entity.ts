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
import Booking from "./booking.entity";
import User from "./user.entity";

/**
 * A HealtSheet.
 */
@Table({
    timestamps: false,
})
export default class HealtSheet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.BOOLEAN })
    anaphylaxisLevel3: boolean; // * sốc Phản vệ độ 3 trở lên

    @Column({ type: DataType.BOOLEAN })
    anaphylaxisLevel2: boolean; // * sốc Phản vệ độ 2 trở lên

    @Column({ type: DataType.BOOLEAN })
    acuteOrChronicIllness: boolean; //* đang mắc bệnh cấp tính hoặc mãn tính

    @Column({ type: DataType.BOOLEAN })
    feverOrHypothermia: boolean; //* sốt hoặc hạ thân nhiệt

    @Column({ type: DataType.BOOLEAN })
    immunodeficiency: boolean; //* suy giảm miễn dịch

    @Column({ type: DataType.BOOLEAN })
    corticoid: boolean; //* đang hoặc mới kết thúc đợt điều trị corticoid liều cao hoặc hóa trị xạ trị

    @Column({ type: DataType.BOOLEAN })
    responseIncreasesGradually: boolean; //* phản ứng tăng dần sau các lần tiêm chủng trước

    @Column({ type: DataType.BOOLEAN })
    abnormalHeart: boolean; //* nghe tim bất thường

    @Column({ type: DataType.BOOLEAN })
    abnormalLungs: boolean; //* nghe phổi bất thường

    @Column({ type: DataType.BOOLEAN })
    unusualSenses: boolean; //* tri giác bất thường

    @Column({ type: DataType.BOOLEAN })
    weight: boolean; //* cân nặng nhỏ hơn 2000g

    @Column({ type: DataType.BOOLEAN })
    other: boolean; //* các chống chỉ định khác

    @Column({ type: DataType.BOOLEAN })
    otherContent: string;

    @ForeignKey(() => Booking)
    bookingId: number;

    @BelongsTo(() => Booking)
    booking: Booking;

    @ForeignKey(() => User)
    nurseStaffId: number;

    @BelongsTo(() => User)
    nurseStaff: User;
}
