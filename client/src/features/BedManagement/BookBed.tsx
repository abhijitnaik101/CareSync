import React, { useState, useEffect } from 'react';

interface Bed {
    bed_number: number;
    availability: boolean;
    name?: string;
    age?: number;
    gender?: string;
    contact?: string;
    hospital_id?: number;
}

const BookBed: React.FC = () => {
    const [beds, setBeds] = useState<Bed[]>([]);
    const [bedNumber, setBedNumber] = useState<number | string>('');
    const [patientDetails, setPatientDetails] = useState<{
        name: string;
        age: string;
        gender: string;
        contact: string;
        hospital_id: string;
    }>({
        name: '',
        age: '',
        gender: '',
        contact: '',
        hospital_id: ''
    });
    const [formVisible, setFormVisible] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/beds')
            .then((response) => response.json())
            .then((data) => setBeds(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleOccupyBed = () => {
        // Validate and format patient details
        const formattedDetails = {
            name: patientDetails.name || null,
            age: patientDetails.age ? parseInt(patientDetails.age) : null,
            gender: patientDetails.gender || null,
            contact: patientDetails.contact || null,
            hospital_id: patientDetails.hospital_id ? parseInt(patientDetails.hospital_id) : null,
        };

        fetch(`http://localhost:3000/api/occupyBed/${bedNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedDetails),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setBeds((prevBeds) =>
                        prevBeds.map((bed) =>
                            bed.bed_number === data.bed_number ? data : bed
                        )
                    );
                    setFormVisible(false);
                    alert('Bed occupied successfully');
                }
            })
            .catch((error) => console.error('Error occupying bed:', error));
    };

    const handleDeoccupyBed = (bedNumber: number) => {
        fetch(`http://localhost:3000/api/deoccupyBed/${bedNumber}`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setBeds((prevBeds) =>
                        prevBeds.map((bed) =>
                            bed.bed_number === bedNumber ? { ...bed, availability: true, name: '', age: undefined, gender: '', contact: '', hospital_id: undefined } : bed
                        )
                    );
                    alert('Bed deoccupied successfully');
                }
            })
            .catch((error) => console.error('Error deoccupying bed:', error));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatientDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const selectedBed = beds.find(bed => bed.bed_number === parseInt(bedNumber.toString()));

    useEffect(() => {
        if (selectedBed) {
            setFormVisible(!selectedBed.availability);
        } else {
            setFormVisible(false);
        }
    }, [bedNumber, selectedBed]);

    return (
        <div>
            <h2>Book Bed</h2>
            <div>
                <input
                    type="number"
                    value={bedNumber}
                    onChange={(e) => setBedNumber(e.target.value)}
                    placeholder="Enter bed number"
                />
                {formVisible ? (
                    <div>
                        <h3>Patient Details</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={patientDetails.name}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={patientDetails.age}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={patientDetails.gender}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="contact"
                            placeholder="Contact"
                            value={patientDetails.contact}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="hospital_id"
                            placeholder="Hospital ID"
                            value={patientDetails.hospital_id}
                            onChange={handleChange}
                        />
                        <button onClick={handleOccupyBed}>Occupy Bed</button>
                    </div>
                ) : (
                    selectedBed && selectedBed.availability && (
                        <button onClick={() => setFormVisible(true)}>Occupy Bed</button>
                    )
                )}
            </div>
            <h3>All Beds</h3>
            <ul>
                {beds.map((bed: Bed) => (
                    <li key={bed.bed_number}>
                        {`Bed ${bed.bed_number} - ${bed.availability ? 'Available' : 'Occupied'}`}
                        {bed.availability ? null : (
                            <div>
                                <p>{`Patient Details: ${bed.name || 'N/A'}, Age: ${bed.age !== undefined ? bed.age : 'N/A'}, Gender: ${bed.gender || 'N/A'}, Contact: ${bed.contact || 'N/A'}`}</p>
                                <button onClick={() => handleDeoccupyBed(bed.bed_number)}>Deoccupy Bed</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookBed;
