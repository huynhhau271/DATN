export interface IUser {
     id: number;
     fullName?: string;
     email: string;
     phone?: string;
     dob?: string;
     activated?: boolean;
     gender?: boolean;
     imageUrl?: string;
     wardId?: string;
     districtId?: string;
     provinceId?: string;
     role: string;
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
