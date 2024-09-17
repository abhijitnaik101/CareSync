export interface Doctor {
  id: number;
  name: string;
  averageTreatmentTime: number;
}

export interface Department {
  id: number;
  name: string;
  hospitalId: number;
  doctors: Doctor[];
}

export interface Hospital {
  id: number;
  name: string;
  coordinates: [string, string];
  services: string[];
  departments: Department[];
}
export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  averageTreatmentTime: number;
  doctor_id: number;
  expected_waiting_time: string;
  working_days: string[];
  working_hours: string;
  experience: string;
  availability: string;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  appointType: string;
  appointmentDate: string;
  doctorName: string;
  hospitalId: number;
  doctorId: number;
  bloodtype?: string;
  contact: string;
  password: string;
  profilePicture?: string;
  serial: string;
  status: string;
}

export interface Ticket {
  id: number;
  hospitalId: number;
  hospital?: Hospital;
  name: string;
  age: number;
  gender: string;
  appointmentDate: string;
  appointType: string;
  doctorId?: number;
  patientId?: number;
  patient?: Patient;
  queue?: Queue[];
  approved: boolean;
  wardId?: number;
  ward?: Ward;
  bed?: number;
}

export interface Queue {
  id: number;
  hospitalId: number;
  hospital: Hospital;
  doctorId: number;
  doctor: Doctor;
  position?: number;
  appointmentDate: string;
  pending: boolean;
  ticketId: number;
  ticket: Ticket;
}

export interface Ward {
  id: number;
  hospitalId: number;
  hospital: Hospital;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  tickets: Ticket[];
}