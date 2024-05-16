export interface IWard {
     id: string;
     name: string;
     type: string;
     districtId: string;
     districts: IDistrict[];
}

export interface IDistrict {
     id?: string;
     name: string;
     type: string;
     provinceId: string;
     wards?: IWard[];
}
export interface IProvince {
     id: string;
     name: string;
     type: string;
     slug: string;
     provinceId: string;
     districts: IDistrict[];
}
