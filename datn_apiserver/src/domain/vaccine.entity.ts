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
import LotNo from "./lot-no.entity";
import Disease from "./disease.entity";
import VaccineDisease from "./vaccine-desean.entity";

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

    @Column({ type: DataType.STRING })
    description?: string;

    @Column({ type: DataType.STRING })
    picture?: string;

    @Column({ type: DataType.STRING })
    source?: string;

    @Column({ type: DataType.STRING })
    injectionRoute?: string;

    @Column({ type: DataType.STRING })
    warning?: string;

    @Column({ type: DataType.STRING })
    unwantedEffects?: string;

    @Column({ type: DataType.INTEGER })
    mothOld?: number;

    @Column({ type: DataType.STRING })
    postInjectionReact?: string;

    @Column({ type: DataType.STRING })
    type?: string;

    @HasMany(() => BoosterNose)
    boosterNoses?: BoosterNose[];

    @HasMany(() => Booking)
    bookings?: Booking[];

    @ForeignKey(() => LotNo)
    lotNoId?: number;

    @BelongsToMany(() => Vaccine, () => VaccineDisease)
    diseases?: Disease[];

    @CreatedAt
    @Column
    createdDate?: Date;

    @UpdatedAt
    lastModifiedDate?: Date;
}
