import { Op } from "sequelize";
import { IDisease } from "../interface/IDisease";
import diseaseRepostitory from "../repositories/diseaseRepostitory";
import { BadRequestError } from "../utils/httpErrors";
import { tranformModel } from "./helper/tranformModelToObject";

interface Diseases {
    diseases: IDisease[];
    limit: number;
    page: number;
    totalPage: number;
}
class DiseaseService {
    async getAllDisease(
        limit: number,
        page: number,
        search?: string
    ): Promise<Diseases> {
        const query = {};
        if (search)
            query["where"] = {
                [Op.or]: [
                    {
                        diseaseName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            };
        query["limit"] = limit;
        query["offset"] = (page - 1) * limit;
        const { rows, count } = await diseaseRepostitory.findAndCountAll({
            ...query,
        });
        let diseases = tranformModel(rows);
        return {
            diseases: diseases,
            limit: limit,
            page: page,
            totalPage: Math.ceil(count / limit),
        };
    }
    async saveDisease(disease: IDisease) {
        if (disease.id) {
            const vaccineForUpdate = await diseaseRepostitory.findByPk(
                disease.id
            );
            if (!vaccineForUpdate)
                throw new BadRequestError("Bệnh Này Không Tồn Tại");
            await diseaseRepostitory.update(disease, {
                where: {
                    id: disease.id,
                },
            });
        } else {
            const checkName = await diseaseRepostitory.findOne({
                where: {
                    diseaseName: disease.diseaseName,
                },
            });
            if (checkName) throw new BadRequestError("Tên Bệnh Đã Tồn Tại");
            const newDisease = await diseaseRepostitory.create(disease);
            return newDisease.toJSON();
        }
    }
    async deleteDisease(id: number) {
        const diseaseForDelete = await diseaseRepostitory.findByPk(id);
        if (!diseaseForDelete)
            throw new BadRequestError("Bệnh Này Không Tồn Tại");
        else
            await diseaseRepostitory.destroy({
                where: {
                    id: id,
                },
            });
    }
}
export default new DiseaseService();
