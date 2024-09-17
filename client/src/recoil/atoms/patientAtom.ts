import { atom } from 'recoil';

interface Patient {
  id: number;
  name: string;
  email: string;
  age: number;
  gender?: string;
  bloodtype?: string;
  contact: string;
  password: string;
  ticket: any[]; // Assuming ticket is an array of objects
  hospitalId?: number;
  hospital?: any; // Assuming hospital is an object
  futureReferences: any[]; // Assuming futureReferences is an array of objects
}

const dummyPatientData: Patient = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 35,
  bloodtype: 'O+',
  contact: '123-456-7890',
  password: 'password123',
  ticket: [],
  hospitalId: 1,
  hospital: {},
  futureReferences: [],
};

const patientState = atom<Patient | null>({
  key: 'patientState',
  default: dummyPatientData,
});

export default patientState;