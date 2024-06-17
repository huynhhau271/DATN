import Districts from "../domain/districts.entity";
import Wards from "../domain/wards.entity";
export interface IUser {
    email?: string;

    activated?: boolean;

    password?: string;

    fullName?: string;

    gender?: boolean;

    phone?: string;

    doB?: Date;

    avatar?: string;

    wardId?: string;

    districtId?: string;

    provinceId?: string;

    roleName?: string;
}
