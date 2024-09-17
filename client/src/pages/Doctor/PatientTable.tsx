import React from "react";
import { FaCheck, FaTrash, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

export interface Patient {
  id: number;
  name: string;
  serial: string;
  gender: string;
  status: "pending" | "checked";
}

interface ActionButton {
  action: string;
  color: string;
  icon: JSX.Element;
}

interface PatientTableProps {
  title: string;
  headerColor: string;
  patients: Patient[];
  onDelete: (id: number) => void;
  onDone?: (id: number) => void;
  onPending?: (id: number) => void;
  onDetails: (patient: Patient) => void;
  actionButtons: ActionButton[];
}

const PatientTable: React.FC<PatientTableProps> = ({
  title,
  headerColor,
  patients,
  onDelete,
  onDone,
  onPending,
  onDetails,
  actionButtons,
}: PatientTableProps) => {
  const getHeaderBg = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-600";
      case "red":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className={`${getHeaderBg(headerColor)} text-white`}>
            {/* Add text-left to align the headers with the table data */}
            <th className="p-4 text-left">Patient</th>
            <th className="p-4 text-left">Serial No.</th>
            <th className="p-4 text-left">Gender</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <tr key={patient.id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4 text-left">{patient.name}</td>
                <td className="p-4 text-left text-blue-600">{patient.serial}</td>
                <td className="p-4 text-left capitalize">
                  <span
                    className={`text-${patient.gender === "male" ? "blue" : "pink"}-600`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-4 flex space-x-2">
                  {actionButtons.map((btn, index) => {
                    if (btn.action === "done" && onDone) {
                      return (
                        <button
                          key={index}
                          onClick={() => onDone(patient.id)}
                          className={`text-${btn.color}-600 bg-${btn.color}-100 p-2 rounded-lg hover:bg-${btn.color}-200 transition`}
                          title="Mark as Done"
                        >
                          {btn.icon}
                        </button>
                      );
                    }
                    if (btn.action === "pending" && onPending) {
                      return (
                        <button
                          key={index}
                          onClick={() => onPending(patient.id)}
                          className={`text-${btn.color}-600 bg-${btn.color}-100 p-2 rounded-lg hover:bg-${btn.color}-200 transition`}
                          title="Mark as Pending"
                        >
                          {btn.icon}
                        </button>
                      );
                    }
                    if (btn.action === "delete") {
                      return (
                        <button
                          key={index}
                          onClick={() => onDelete(patient.id)}
                          className={`text-${btn.color}-600 bg-${btn.color}-100 p-2 rounded-lg hover:bg-${btn.color}-200 transition`}
                          title="Delete"
                        >
                          {btn.icon}
                        </button>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={() => onDetails(patient)}
                    className="text-blue-600 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition"
                    title="Details"
                  >
                    <FaInfoCircle />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;