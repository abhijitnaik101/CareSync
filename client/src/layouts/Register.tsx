import { useState, useEffect, FC, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';

// Define roles type
type Role = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist";

// Define form data structure for each role
interface AdminForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  hospitalName: string;
  hospitalAdminpass: string;
}

interface InventorymanForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  hospitalName: string;
  hospitalInventorypass: string;
}

interface DoctorForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialty?: string;
  hospitalName: string;
  hospitalDocpass: string;
  description?: string;
  workingdays: number;
}

interface PatientForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  bloodType?: string;
  contact: string;
}

interface ReceptionistForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  hospitalName: string;
  hospitalReceptionpass: string;
}

// Define union type for all forms
type FormData = AdminForm | InventorymanForm | DoctorForm | PatientForm | ReceptionistForm;

interface Hospital {
  id: number;
  name: string;
  coordinates: number[];
  services: string[];
}

const Register = () => {
  const roles = ["Admin", "Patient", "Doctor", "Inventoryman", "Receptionist"];
  const [role, setRole] = useState<Role | "">('');
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [formData, setFormData] = useState<FormData | Partial<FormData>>({});
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hospital names on component mount
    const fetchHospitals = async () => {
      try {
        const response = await axios.get<Hospital[]>(route + '/hospitals');
        setHospitalList(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:");
      }
    };
    fetchHospitals();
  }, []);

  const handleRoleSelection = () => {
    if (role) {
      setIsRoleSelected(true);
    }
  };

  const handleBack = () => {
    setIsRoleSelected(false);
    setFormData({});
    setRole('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = { ...formData, role };
    try {
      await axios.post(route + '/auth/register', payload);
      alert('Registration Successful');
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const RenderFormFields: FC = () => {
    switch (role) {
      case 'Admin':
        return (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <select name="hospitalName" onChange={handleChange}>
              <option value="">Select Hospital</option>
              {hospitalList.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <input type="password" name="hospitalAdminpass" placeholder="Admin Password" onChange={handleChange} />
          </>
        );
      case 'Inventoryman':
        return (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <select name="hospitalName" onChange={handleChange}>
              <option value="">Select Hospital</option>
              {hospitalList.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <input type="password" name="hospitalInventorypass" placeholder="Inventory Password" onChange={handleChange} />
          </>
        );
      case 'Doctor':
        return (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <input type="text" name="specialty" placeholder="Specialty" onChange={handleChange} />
            <select name="hospitalName" onChange={handleChange}>
              <option value="">Select Hospital</option>
              {hospitalList.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <input type="password" name="hospitalDocpass" placeholder="Doctor Password" onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange} />
            <input type="number" name="workingdays" placeholder="Working Days" onChange={handleChange} />
          </>
        );
      case 'Patient':
        return (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} />
            <input type="text" name="bloodType" placeholder="Blood Type" onChange={handleChange} />
            <input type="text" name="contact" placeholder="Contact Number" onChange={handleChange} />
          </>
        );
      case 'Receptionist':
        return (
          <>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
            <select name="hospitalName" onChange={handleChange}>
              <option value="">Select Hospital</option>
              {hospitalList.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <input type="password" name="hospitalReceptionpass" placeholder="Receptionist Password" onChange={handleChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isRoleSelected ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Form and Back button logic here */}
            <button onClick={handleBack}>
              {/* Back SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mb-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {role} Registration
            </h1>
            <div className="space-y-4">
              <RenderFormFields />
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
              >
                Register
              </button>
              {error && <div className="text-red-500 text-center">{error}</div>}
            </div>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Select Role
            </h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button
              onClick={handleRoleSelection}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              Next
            </button>
          </>
        )}
      </motion.div>

    </div>
  );
};

export default Register;