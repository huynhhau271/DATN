import { Model } from "sequelize-typescript";

export const tranformModel = (models: Model[]): any[] => {
    return models.map((model) => {
        return model.toJSON();
    });
};
