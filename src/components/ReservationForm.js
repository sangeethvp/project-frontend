import { useState } from "react";
import { useParams } from 'react-router-dom';
import api from "../api";

const ReservationForm = ({closeReservationForm}) => {
    const { id: restaurentId } = useParams();
    const [time, setTime] = useState('');
    const [numberofpeople, setNumberOfPeople] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token) {
                console.error('No token found');
                return;
            }
            if (!userId) { console.error('No user ID found'); return;}
            
            const response = await api.post('/reservation', {
                user:userId,
                restaurent: restaurentId,
                time,
                numberofpeople
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Reserved successfully", response.data);
            closeReservationForm();

        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Time:</label>
                <input
                    type="text"
                    value={time}
                    placeholder="Please enter the time for the reservation"
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Number of People:</label>
                <input
                    type="number"
                    value={numberofpeople}
                    placeholder="Enter the number of people"
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Reserve</button>
        </form>
    );
};

export default ReservationForm;
