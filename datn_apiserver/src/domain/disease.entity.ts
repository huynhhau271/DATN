/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AutoIncrement,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import Vaccine from "./vaccine.entity";
import VaccineDisease from "./vaccine-desean.entity";

/**
 * A Disease.
 */
@Table
export default class Disease extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    diseaseName: string;

    @Column({ type: DataType.TEXT })
    symptom: string;

    @Column({ type: DataType.TEXT })
    revention: string;

    @Column({ type: DataType.STRING })
    image: string;

    @BelongsToMany(() => Vaccine, () => VaccineDisease)
    vaccines: Vaccine[];

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    updatedAt?: Date;
}
