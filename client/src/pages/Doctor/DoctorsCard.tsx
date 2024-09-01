import React from 'react';

// Define the props for the DoctorCard component
interface DoctorCardProps {
    specialty: string;
    name: string;
    queueNumber: number;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ specialty, name, queueNumber }) => {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-5 mb-5">
            <div>
                <h2 className="text-lg font-bold">{specialty}</h2>
                <p className="text-sm">{name}</p>
            </div>
            <div className="flex items-center">
                <span className="text-sm">queue</span>
                <span className="ml-3 bg-gray-200 rounded-md py-1 px-3">{queueNumber}</span>
            </div>
        </div>
    );
};

const DoctorsAppointment: React.FC = () => {
    return (
        <div className="p-6">
            <DoctorCard specialty="Ophthalmologist" name="Dr. John Doe" queueNumber={0} />
            {/* Add more DoctorCard components here if needed */}
        </div>
    );
};

export default DoctorsAppointment;
