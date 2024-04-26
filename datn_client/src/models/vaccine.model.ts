export interface Vaccine {
  id?: number;
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
  boosterNoses?: any;
  bookings?: any;
  lotNoId?: number;
  diseases?: any;
  createdDate?: Date;
  lastModifiedDate?: Date;
}
