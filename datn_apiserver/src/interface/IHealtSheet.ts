export interface HealtSheetPayload {
    id?: number;

    anaphylaxisLevel3: boolean; // * sốc Phản vệ độ 3 trở lên

    anaphylaxisLevel2: boolean; // * sốc Phản vệ độ 2 trở lên

    acuteOrChronicIllness: boolean; //* đang mắc bệnh cấp tính hoặc mãn tính

    feverOrHypothermia: boolean; //* sốt hoặc hạ thân nhiệt

    immunodeficiency: boolean; //* suy giảm miễn dịch

    corticoid: boolean; //* đang hoặc mới kết thúc đợt điều trị corticoid liều cao hoặc hóa trị xạ trị

    responseIncreasesGradually: boolean; //* phản ứng tăng dần sau các lần tiêm chủng trước

    abnormalHeart: boolean; //* nghe tim bất thường

    abnormalLungs: boolean; //* nghe phổi bất thường

    unusualSenses: boolean; //* tri giác bất thường

    weight: boolean; //* cân nặng nhỏ hơn 2000g

    other: boolean; //* các chống chỉ định khác

    otherContent: string;

    bookingId: number;

    status: string;
    nurseStaffId: number;
}
