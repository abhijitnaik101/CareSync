import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './layouts/Landing';
import Login from './layouts/Login';
import AdminLayout from './layouts/AdminLayout';
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';
import InventoryManagerLayout from './layouts/InventoryManagerLayout';
import ReceptionistLayout from './layouts/ReceptionistLayout';
import Register from './layouts/Register';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/patient/*" element={<PatientLayout />} />
                <Route path="/doctor/*" element={<DoctorLayout />} />
                <Route path="/inventory-manager/*" element={<InventoryManagerLayout />} />
                <Route path="/receptionist/*" element={<ReceptionistLayout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
