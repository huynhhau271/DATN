import { Op } from "sequelize";
import vaccineRepository from "../repositories/vaccineRepository";
import { IVaccine } from "../interface/IVaccine";
import { BadRequestError } from "../utils/httpErrors";
import { User } from "../utils/user";
import { tranformModel } from "./helper/tranformModelToObject";
import boosterNoseRepository from "../repositories/boosterNoseRepository";
import BoosterNose from "../domain/booster-nose.entity";
import { database } from "../configs/database";
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
            include: [boosterNoseRepository],
        });
        let vaccines = tranformModel(rows);
        return {
            vaccines: vaccines,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
    async getAllVaccineByMontOld(mothOld: number) {
        const vaccines = await vaccineRepository.findAll({
            where: {
                mothOld: { [Op.lte]: mothOld },
                status: true,
            },
            include: [
                {
                    model: boosterNoseRepository,
                },
            ],
        });
        return vaccines;
    }
    async saveVaccine(user: User, vaccine: IVaccine) {
        if (vaccine.id) {
            let vaccineForUpdate = (
                await vaccineRepository.findByPk(vaccine.id)
            ).toJSON();
            if (!vaccineForUpdate)
                throw new BadRequestError("Vaccien Không Tồn Tại");
            const t = await database.transaction();
            try {
                vaccineForUpdate.vaccineName = vaccine.vaccineName;
                vaccineForUpdate.price = vaccine.price;

                vaccineForUpdate.description = vaccine.description;

                vaccineForUpdate.picture = vaccine.picture;

                vaccineForUpdate.source = vaccine.source;

                vaccineForUpdate.injectionRoute = vaccine.injectionRoute;

                vaccineForUpdate.warning = vaccine.warning;

                vaccineForUpdate.unwantedEffects = vaccine.unwantedEffects;

                vaccineForUpdate.mothOld = vaccine.mothOld;

                vaccineForUpdate.postInjectionReact =
                    vaccine.postInjectionReact;
                vaccineForUpdate.boosterNoses = vaccine.boosterNoses.map(
                    (bn) => {
                        return {
                            noseNumber: bn.noseNumber,
                            distance: bn.distance, // * moth
                        } as BoosterNose;
                    }
                );
                await vaccineForUpdate.save();
                // await vaccineRepository.update(
                //     {
                //         ...vaccine,
                //         boosterNoses: vaccine.boosterNoses.map((bt) => {
                //             return {
                //                 id: bt?.id,
                //                 noseNumber: bt.noseNumber,
                //                 distance: bt.distance,
                //                 vaccineId: vaccine.id,
                //             } as BoosterNose;
                //         }),
                //     },
                //     {
                //         where: {
                //             id: vaccine.id,
                //         },
                //     }
                // );
                await t.commit();
            } catch (error) {
                t.rollback();
            }
        } else {
            const checkName = await vaccineRepository.findOne({
                where: {
                    vaccineName: vaccine.vaccineName,
                },
            });
            if (checkName) throw new BadRequestError("Tên Vaccine Đã Tồn Tại");
            const newVaccine = await vaccineRepository.create(
                {
                    ...vaccine,
                    boosterNoses: vaccine.boosterNoses
                        ? vaccine.boosterNoses.map((bn) => {
                              return {
                                  noseNumber: bn.noseNumber,
                                  distance: bn.distance, // * moth
                              } as BoosterNose;
                          })
                        : null,
                },
                vaccine.boosterNoses && {
                    include: [boosterNoseRepository],
                }
            );
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
