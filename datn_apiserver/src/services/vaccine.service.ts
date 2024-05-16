import { Op } from "sequelize";
import vaccineRepository from "../repositories/vaccineRepository";
import { IVaccine } from "../interface/IVaccine";
import { BadRequestError } from "../utils/httpErrors";
import { User } from "../utils/user";
import { tranformModel } from "./helper/tranformModelToObject";
interface Vaccines {
    vaccines: IVaccine[];
    limit: number;
    page: number;
    totalPage: number;
}
class VaccineService {
    async getAllVaccine(
        limit: number,
        page: number,
        search?: string
    ): Promise<Vaccines> {
        const query = {};
        if (search)
            query["where"] = {
                [Op.or]: [
                    {
                        vaccineName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        query["limit"] = limit;
        query["offset"] = (page - 1) * limit;
        const { rows, count } = await vaccineRepository.findAndCountAll({
            ...query,
        });
        let vaccines = tranformModel(rows);
        return {
            vaccines: vaccines,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
    async saveVaccine(user: User, vaccine: IVaccine) {
        if (vaccine.id) {
            const vaccineForUpdate = await vaccineRepository.findByPk(
                vaccine.id
            );
            if (!vaccineForUpdate)
                throw new BadRequestError("Vaccien Không Tồn Tại");
            await vaccineRepository.update(vaccine, {
                where: {
                    id: vaccine.id,
                },
            });
        } else {
            const checkName = await vaccineRepository.findOne({
                where: {
                    vaccineName: vaccine.vaccineName,
                },
            });
            if (checkName) throw new BadRequestError("Tên Vaccine Đã Tồn Tại");
            const newVaccine = await vaccineRepository.create({
                ...vaccine,
                quantity: 0,
            });
            return newVaccine.toJSON();
        }
    }
    async activeAndBlockVaccine(idVaccine: number, status: boolean) {
        const user = await vaccineRepository.findOne({
            where: {
                id: idVaccine,
                status: status,
            },
        });
        if (!user) throw new BadRequestError("User Không Tồn Tại");
        await vaccineRepository.update(
            {
                status: !status,
            },
            {
                where: {
                    id: idVaccine,
                    status: status,
                },
            }
        );
    }
}
export default new VaccineService();
