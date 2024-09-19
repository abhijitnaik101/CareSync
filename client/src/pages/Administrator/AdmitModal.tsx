import { useState, useEffect } from "react";
import { Patient, Ward } from "../../Types";

 const AdmitModal: React.FC<{ onClose: () => void; onSave: (patient: Patient) => void; selectedWardId: number; wards: Ward[] }> = ({
    onClose,
    onSave,
    selectedWardId,
    wards,
  }) => {
    const [patientName, setPatientName] = useState<string>("");
    const [patientGender, setPatientGender] = useState<string>("");
    const [selectedBed, setSelectedBed] = useState<number | null>(null);
    const [availableBeds, setAvailableBeds] = useState<number[]>([]);
    // const [socketPatient, setSocketPatient] = useState<Patient | null>(null);
  
    // useEffect(() => {
    //   socket.on('admit-request-response', (data: Patient) => {
    //     console.log("admin admit patient modal", data);
    //     setSocketPatient(data);
    //     setPatientName(data.name);
    //     setPatientGender(data.gender);
    //     setSelectedBed(data.bed);
    //   });
  
    //   return () => {
    //     socket.off('admit-patient-response');
    //   };
    // }, []);
  
    useEffect(() => {
      const selectedWard = wards.find((ward) => ward.id === selectedWardId);
  
      if (selectedWard) {
        const occupiedBeds = selectedWard.patients.map((patient: { bed: any; }) => patient.bed);
        const totalBeds = [...Array(10).keys()].map((i) => i + 1);
        const available = totalBeds.filter((bed) => !occupiedBeds.includes(bed));
        setAvailableBeds(available);
      }
    }, [selectedWardId, wards]);
  
    const handleSubmit = () => {
      if (patientName && patientGender && selectedBed) {
        const newPatient: Patient = {
          id: Math.floor(Math.random() * 10000), //socketPatient ? socketPatient.id : Math.floor(Math.random() * 10000),
          name: patientName,
          bed: selectedBed,
          gender: patientGender,
          status: "Occupied",
          age: 0,
          email: "",
          contact: "",
          appointType: "",
          appointmentDate: new Date(),
        };
        onSave(newPatient);
        onClose();
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="bg-gray-800 text-white w-96 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Admit Patient</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full mt-2 p-2 rounded bg-gray-700 border-none focus:ring-2 focus:ring-purple-500"
              //readOnly={!!socketPatient} // Make input read-only if patient data is received
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              className="w-full mt-2 p-2 rounded bg-gray-700 border-none focus:ring-2 focus:ring-purple-500"
              //disabled={!!socketPatient} // Make select disabled if patient data is received
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="TRANS">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Bed Number</label>
            <select
              value={selectedBed || ""}
              onChange={(e) => setSelectedBed(Number(e.target.value))}
              className="w-full mt-2 p-2 rounded bg-gray-700 border-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Bed</option>
              {availableBeds.map((bed) => (
                <option key={bed} value={bed}>
                  Bed {bed}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition">
              Cancel
            </button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AdmitModal;