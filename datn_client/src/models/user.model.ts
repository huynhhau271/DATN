export interface IUser {
     id: number;
     fullName?: string;
     email: string;
     phone?: string;
     doB?: string;
     activated?: boolean;
     gender?: boolean;
     imageUrl?: string;
     wardId?: number;
     role: {
          name: string;
     };
}

export type LoginResponse = {
     token: string;
     refreshToken: string;
     user: IUser;
     exp: number;
};

export type LoginPayLoad = {
     password: string;
     rememberMe: boolean;
     email: string;
};
