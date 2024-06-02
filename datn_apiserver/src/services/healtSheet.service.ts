import { database } from "../configs/database";
import { HealtSheetPayload } from "../interface/IHealtSheet";
import bookingRepository from "../repositories/bookingRepository";
import healtSheetRepository from "../repositories/healtSheetRepository";
import { BadRequestError } from "../utils/httpErrors";

class HealtSheetService {
    async physicalExamination(value: HealtSheetPayload) {
        const t = await database.transaction();
        try {
            await bookingRepository.update(
                {
                    statused: value.status,
                },
                {
                    where: {
                        id: value.bookingId,
                    },
                }
            );
            await healtSheetRepository.create(value);
            await t.commit();
        } catch (error) {
            console.log(error);

            await t.rollback();
            throw new BadRequestError("Cập Nhật Thông Tin Sức Khỏe Thất Bại");
        }
    }
}
export default new HealtSheetService();
