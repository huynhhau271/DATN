import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from "sequelize-typescript";
import BoosterNose from "./booster-nose.entity";
import Booking from "./booking.entity";
import Disease from "./disease.entity";
import VaccineDisease from "./vaccine-desean.entity";
import importDetail from "./importDetails.entity";

/**
 * A Vaccine.
 */
@Table
export default class Vaccine extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.BIGINT })
    id?: number;

    @Column({ type: DataType.STRING })
    vaccineName?: string;

    @Column({ type: DataType.INTEGER })
    quantity?: number;

    @Column({ type: DataType.DECIMAL })
    price?: number;

    @Column({ type: DataType.TEXT })
    description?: string;

    @Column({ type: DataType.STRING })
    picture?: string;

    @Column({ type: DataType.TEXT })
    source?: string;

    @Column({ type: DataType.TEXT })
    injectionRoute?: string;

    @Column({ type: DataType.TEXT })
    warning?: string;

    @Column({ type: DataType.TEXT })
    unwantedEffects?: string;

    @Column({ type: DataType.BOOLEAN })
    status: boolean;

    @Column({ type: DataType.INTEGER })
    mothOld?: number;

    @Column({ type: DataType.TEXT })
    postInjectionReact?: string;

    @Column({ type: DataType.STRING })
    type?: string;

    @HasMany(() => BoosterNose)
    boosterNoses?: BoosterNose[];

    @HasMany(() => Booking)
    bookings?: Booking[];

    @BelongsToMany(() => Vaccine, () => VaccineDisease)
    diseases?: Disease[];

    @HasMany(() => importDetail)
    importDetail: importDetail[];
    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
