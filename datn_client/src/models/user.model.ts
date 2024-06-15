export interface IUser {
     id: number;
     fullName: string;
     email: string;
     phone?: string;
     dob?: string;
     activated?: boolean;
     gender?: boolean;
     avatar?: string;
     wardId?: string;
     districtId?: string;
     provinceId?: string;
     roleName: string;
}

export type LoginResponse = {
     token: string;
     refreshToken: string;
     user: IUser;
};

export type LoginPayLoad = {
     password: string;
     email: string;
};
