import { useEffect, useState } from "react";
import api from "../api";
import DeleteReservation from "./DeleteReservation";

const GetReservation = () => {
    const [reservation, setReservation] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getReservation = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await api.get(`/user-Reservation/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReservation(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                    setError('Error retrieving reservations.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    setError('No response from server.');
                } else {
                    console.error('Error message:', error.message);
                    setError('An error occurred.');
                }
            }
        };
        getReservation();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!reservation.length) {
        return <div className="text-gray-600">No reservations found.</div>;
    }

    const removeReviewFromList = (reservationId) => {
        setReservation(prevReservation => prevReservation.filter(reservation => reservation._id !== reservationId));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h3 className="text-2xl font-bold mb-4">Your Reservations</h3>
            {reservation.map((reservation, index) => (
                <div key={index} className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
                    <h4 className="font-semibold text-lg">{reservation.restaurent.name}</h4>
                    <p className="text-gray-700">Date: {reservation.date}</p>
                    <p className="text-gray-700">Time: {reservation.time}</p>
                    <p className="text-gray-700">Number of People: {reservation.numberofpeople}</p>
                    <DeleteReservation reservationId={reservation._id} onDelete={removeReviewFromList} />
                </div>
            ))}
        </div>
    );
};

export default GetReservation;
