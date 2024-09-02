import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdministraterWard from "./pages/Administrator/AdminWard";
import Registration from "./pages/Receptionist/ReceptionistRegistration";
import NewRegistration from "./components/Receptionist/NewRegistration";
import DoctorsAppointment from "./pages/Doctor/DoctorsCard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorNotification from "./pages/Doctor/DoctorNotification";
import MedicineList from "./pages/InventoryManager/Inventory";
import MedicineDetail from "./pages/InventoryManager/MedicineDetail";
import MedicineOrder from "./pages/InventoryManager/InventoryOrder";
import MedicineTrack from "./pages/InventoryManager/InventoryStatus";
import Map from "./pages/Patient/Map";
import HospitalSpecialization from "./pages/Patient/HospitalSpecialization";
import HospitalHistory from "./pages/Patient/PatientHistory";
import HospitalNotification from "./pages/Patient/PatientNotification";

function App() {
  const orders = [
    {
      name: "Paracetamol",
      supplier: "Alexix Pharmacist",
      category: "Medicine",
      arrival: "5 days",
      status: "shipped",
    },
    {
      name: "Ibuprofen",
      supplier: "Health Pharma",
      category: "Medicine",
      arrival: "3 days",
      status: "processing",
    },
    {
      name: "Aspirin",
      supplier: "Wellness Meds",
      category: "Medicine",
      arrival: "4 days",
      status: "arrived",
    },
    {
      name: "Amoxicillin",
      supplier: "CarePlus Pharmacy",
      category: "Antibiotic",
      arrival: "2 days",
      status: "shipped",
    },
    {
      name: "Metformin",
      supplier: "Diabetes Care",
      category: "Medicine",
      arrival: "6 days",
      status: "processing",
    },
    {
      name: "Atorvastatin",
      supplier: "Heart Health Corp",
      category: "Medicine",
      arrival: "3 days",
      status: "packaged",
    },
    {
      name: "Lisinopril",
      supplier: "PharmaLife",
      category: "Medicine",
      arrival: "7 days",
      status: "shipped",
    },
    {
      name: "Omeprazole",
      supplier: "Gastro Health",
      category: "Medicine",
      arrival: "5 days",
      status: "arrived",
    },
    {
      name: "Azithromycin",
      supplier: "Med Supply Co.",
      category: "Antibiotic",
      arrival: "2 days",
      status: "processing",
    },
    {
      name: "Levothyroxine",
      supplier: "Thyroid Pharma",
      category: "Medicine",
      arrival: "8 days",
      status: "shipped",
    },
    {
      name: "Hydrochlorothiazide",
      supplier: "Hypertension Care",
      category: "Medicine",
      arrival: "3 days",
      status: "arrived",
    },
    {
      name: "Prednisone",
      supplier: "Steroid Solutions",
      category: "Steroid",
      arrival: "4 days",
      status: "packaged",
    },
  ];
  const doctors = [
    {
      name: "John Doe",
      schedule: "9:00 - 4:00",
      specialty: "cardiologist",
      hospital: "Apollo",
      waitingTime: 35,
      fee: 400,
    },
    {
      name: "Jane Smith",
      schedule: "10:00 - 5:00",
      specialty: "dermatologist",
      hospital: "Medicare",
      waitingTime: 20,
      fee: 350,
    },
    {
      name: "Alice Johnson",
      schedule: "8:00 - 3:00",
      specialty: "pediatrician",
      hospital: "City Health",
      waitingTime: 45,
      fee: 300,
    },
    {
      name: "Michael Brown",
      schedule: "11:00 - 6:00",
      specialty: "orthopedic",
      hospital: "HealthPlus",
      waitingTime: 25,
      fee: 500,
    },
    {
      name: "Emily Davis",
      schedule: "9:00 - 2:00",
      specialty: "neurologist",
      hospital: "CareFirst",
      waitingTime: 30,
      fee: 450,
    },
    {
      name: "Robert Wilson",
      schedule: "1:00 - 8:00",
      specialty: "general practitioner",
      hospital: "Wellness Clinic",
      waitingTime: 15,
      fee: 250,
    },
    {
      name: "Sarah Lee",
      schedule: "9:00 - 5:00",
      specialty: "gynecologist",
      hospital: "Women’s Health",
      waitingTime: 40,
      fee: 400,
    },
    {
      name: "David Green",
      schedule: "8:00 - 4:00",
      specialty: "urologist",
      hospital: "UroCare",
      waitingTime: 50,
      fee: 420,
    },
  ];

  const initialRegistrations = [
    {
      name: "Saswat Kumar Dash",
      date: "10/10/2024",
      gender: "female",
      register: "10:30 a.m.",
      visit: "10:30 a.m.",
    },
    // Other entries...
  ];
  
  const medicines = [
    { id: 1, name: "Paracetamol", price: 40, quantity: 45, expiry: "12/2025", type: "tablets" },
    { id: 2, name: "Ibuprofen", price: 50, quantity: 30, expiry: "10/2024", type: "capsules" },
    { id: 3, name: "Amoxicillin", price: 60, quantity: 20, expiry: "08/2024", type: "tablets" },
    { id: 4, name: "Cetirizine", price: 35, quantity: 50, expiry: "07/2026", type: "tablets" },
    { id: 5, name: "Metformin", price: 70, quantity: 25, expiry: "05/2025", type: "tablets" },
    { id: 6, name: "Loratadine", price: 55, quantity: 40, expiry: "06/2025", type: "tablets" },
    { id: 7, name: "Omeprazole", price: 80, quantity: 15, expiry: "01/2024", type: "capsules" },
    { id: 8, name: "Amlodipine", price: 90, quantity: 22, expiry: "03/2024", type: "tablets" },
    { id: 9, name: "Hydrochlorothiazide", price: 65, quantity: 18, expiry: "11/2024", type: "tablets" },
    { id: 10, name: "Simvastatin", price: 75, quantity: 27, expiry: "02/2025", type: "tablets" },
    { id: 11, name: "Vitamin C Powder", price: 25, quantity: 100, expiry: "09/2025", type: "powders" },
    { id: 12, name: "Anti-Itch Cream", price: 45, quantity: 50, expiry: "12/2025", type: "creams" },
    { id: 13, name: "Antibiotic Ointment", price: 40, quantity: 35, expiry: "04/2025", type: "ointments" },
    { id: 14, name: "Insulin Injection", price: 120, quantity: 10, expiry: "06/2024", type: "injectables" },
    { id: 15, name: "Hydrocortisone Gel", price: 50, quantity: 25, expiry: "08/2025", type: "gels" },
    { id: 16, name: "Nasal Drops", price: 30, quantity: 60, expiry: "11/2024", type: "drops" },
    { id: 17, name: "Antiseptic Gel", price: 55, quantity: 40, expiry: "03/2025", type: "gels" }
  ];
  

  const [registrations, setRegistrations] = useState(initialRegistrations);

  const handleNewRegistration = (formData) => {
    setRegistrations([...registrations, formData]);
  };

  return (
    // <DoctorsAppointment/>
    <DoctorProfile/>
    // <DoctorNotification />
    // <MedicineList medicines={medicines}/>
    // <MedicineDetail
    //   medicineName="Paracetamol"
    //   inStock={20}
    //   expDate="2025-08-29"
    //   mfgDate="2023-08-29"
    //   price={50}
    //   category="Painkiller"
    //   type="Tablet"
    // />

    // <MedicineOrder orders={orders} />

    // <Map/>

    // <HospitalSpecialization doctors={doctors} />

    // <HospitalHistory historyItems={historyItems} />
    // <HospitalNotification />

    // <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //   <MedicineTrack
    //     name="Paracetamol"
    //     supplier="alexix pharmacist"
    //     arrival="5 days"
    //     status="shipped"
    //     from="Ajmer"
    //     to="Agra"
    //   />
    // </div>
    
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route
    //         path="/registration"
    //         element={<Registration registrations={registrations} />}
    //       />
    //       <Route path="/new-registration" element={<NewRegistration onNewRegistration={handleNewRegistration} />} />
    //       <Route
    //         path="*"
    //         element={<Registration registrations={registrations} />}
    //       />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
