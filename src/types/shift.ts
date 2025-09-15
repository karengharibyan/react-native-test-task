export interface Shift {
  id: string;
  logo: string; // URL to employer logo
  address: string; // Shift location address
  companyName: string; // Employer company name
  dateStartByCity: string; // Start date
  timeStartByCity: string; // Start time
  timeEndByCity: string; // End time
  currentWorkers: number | null; // Current number of workers signed up
  planWorkers: number | null; // Required number of workers
  workTypes: WorkType[]; // Type of service/work
  priceWorker: number | null; // Payment amount in rubles
  customerFeedbacksCount: number | null; // Number of customer reviews
  customerRating: number | null; // Customer rating (max 5)
}

export interface ShiftListResponse {
  shifts: Shift[];
  total: number;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export interface WorkType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}
