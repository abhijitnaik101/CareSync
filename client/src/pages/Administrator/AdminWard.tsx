import React, { useEffect, useState } from "react"
// Patient and Ward Interfaces
interface Patient {
  id: number;
  name: string;
  bed: number;
  gender: string;
  status: "Occupied" | "Unoccupied";
}

interface Ward {
  id: number;
  name: string;
  patients: Patient[];
}

// Sample wards with 10 beds each (local DB)
const initialWards: Ward[] = [
  {
    id: 1,
    name: "General Ward",
    patients: [
      { id: 1, name: "John Doe", bed: 1, gender: "Male", status: "Occupied" },
      { id: 2, name: "Jane Smith", bed: 2, gender: "Female", status: "Occupied" },
      // other beds can be unoccupied initially
      { id: 3, name: "Alice Green", bed: 3, gender: "Female", status: "Unoccupied" },
      { id: 4, name: "Bob Brown", bed: 4, gender: "Male", status: "Unoccupied" },
    ],
  },
  {
    id: 2,
    name: "ICU Ward",
    patients: [
      { id: 3, name: "Alice Green", bed: 1, gender: "Female", status: "Occupied" },
      // other beds unoccupied initially
      { id: 4, name: "Bob Brown", bed: 2, gender: "Male", status: "Unoccupied" },
      { id: 5, name: "Charlie Clark", bed: 3, gender: "Male", status: "Unoccupied" },
    ],
  },
];
// Modal component for admitting new patient
const AdmitModal: React.FC<{ onClose: () => void; onSave: (patient: Patient) => void }> = ({
  onClose,
  onSave,
}) => {
  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [selectedBed, setSelectedBed] = useState(0); // Use state for selected bed

  const [availableBeds, setAvailableBeds] = useState<number[]>([]); // State for available beds

  // Function to calculate available beds on modal open
  useEffect(() => {
    const wards = initialWards; // Get wards from props or state
    const selectedWardId = 1; // Assuming selected ward is retrieved (replace with actual logic)
    const selectedWard = wards.find((ward) => ward.id === selectedWardId);

    if (selectedWard) {
      const occupiedBeds = selectedWard.patients.map((patient) => patient.bed);
      const allBeds = [...Array(10).keys()].map((i) => i + 1); // Assuming 10 beds (adjust)
      const available = allBeds.filter((bed) => !occupiedBeds.includes(bed));
      setAvailableBeds(available);
    }
  }, []); // Run only once on modal open

  const handleSubmit = () => {
    if (patientName && patientGender && selectedBed) {
      const newPatient: Patient = {
        id: Math.floor(Math.random() * 10000),
        name: patientName,
        bed: selectedBed,
        gender: patientGender,
        status: "Occupied",
      };
      onSave(newPatient);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Admit Patient</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bed Number</label>
          <select
            value={selectedBed}
            onChange={(e) => setSelectedBed(Number(e.target.value))}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Bed</option>
            {availableBeds.map((bed) => (
              <option key={bed} value={bed}>
                {bed}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );

};

// PatientRow Component for displaying individual patient details
const PatientRow: React.FC<{ patient: Patient; onDischarge: () => void; onDetails: () => void }> = ({
  patient,
  onDischarge,
  onDetails,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-4 text-gray-800">{patient.name}</td>
      <td className="px-4 py-4 text-gray-800">{patient.bed}</td>
      <td className="px-4 py-4 text-gray-800">{patient.gender}</td>
      <td className="px-4 py-4">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
          {patient.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <button onClick={onDetails} className="text-blue-600 hover:text-blue-800 font-medium border border-blue-600 px-4 py-2 rounded-lg transition">
            Details
          </button>
          <button onClick={onDischarge} className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg font-medium transition">
            Discharge
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main AdministratorWard Component
const AdministratorWard: React.FC = () => {
  const [wards, setWards] = useState<Ward[]>(initialWards);
  const [selectedWard, setSelectedWard] = useState<number>(1);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);


  const patient: Patient = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    gender: 'Male',
  };

  
  
  const handleAdmitPatient = (newPatient: Patient) => {
    setWards((prevWards) =>
      prevWards.map((ward) =>
        ward.id === selectedWard ? { ...ward, patients: [...ward.patients, newPatient] } : ward
      )
    );
  };

  const handleDischargePatient = (patientId: number) => {
    setWards((prevWards) =>
      prevWards.map((ward) =>
        ward.id === selectedWard
          ? { ...ward, patients: ward.patients.filter((p) => p.id !== patientId) }
          : ward
      )
    );
  };

  const handleShowDetails = (patient: Patient) => {
    setCurrentPatient(patient);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Ward Management</h1>

        {/* Ward Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <label className="text-lg font-medium text-gray-700">Wards</label>
          <select
            className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={selectedWard}
            onChange={(e) => setSelectedWard(Number(e.target.value))}
          >
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAdmitModal(true)}
            className="ml-auto bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Admit Patient
          </button>
          <button
            onClick={() => setShowAdmitModal(true)}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Bed Request
          </button>
        </div>

        {/* Patient Table */}
        <div className="overflow-hidden shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Patient</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Bed</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wards
                .find((ward) => ward.id === selectedWard)
                ?.patients.map((patient) => (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    onDischarge={() => handleDischargePatient(patient.id)}
                    onDetails={() => handleShowDetails(patient)}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {/* Patient Details Modal */}
        {currentPatient && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
              <p><strong>Name:</strong> {currentPatient.name}</p>
              <p><strong>Gender:</strong> {currentPatient.gender}</p>
              <p><strong>Bed:</strong> {currentPatient.bed}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setCurrentPatient(null)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admit Modal */}
        {showAdmitModal && (
          <AdmitModal
            onClose={() => setShowAdmitModal(false)}
            onSave={handleAdmitPatient}
          />
        )}
      </div>
    </div>
  );
};

export default AdministratorWard;
