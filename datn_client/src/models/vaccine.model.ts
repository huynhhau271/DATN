export interface IVaccine {
     id: number;
     vaccineName?: string;
     quantity?: number;
     price?: number;
     description?: string;
     picture?: string;
     source?: string;
     injectionRoute?: string;
     warning?: string;
     unwantedEffects?: string;
     mothOld?: number;
     postInjectionReact?: string;
     type?: string;
     createdDate?: Date;
     lastModifiedDate?: Date;
     status: boolean;
}
