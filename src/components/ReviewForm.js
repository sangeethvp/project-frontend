import { useState } from "react";
import api from "../api";
import { useParams } from 'react-router-dom';

const ReviewForm = ({ closeReviewForm }) => {
    const { id: restaurentId } = useParams();
    const[name,setName] =useState("");
    const [ratings, setRatings] = useState("");
    const [comments, setComments] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token) {
                console.error('No token found');
                return;
            }
            if (!userId) {
                console.error('No user ID found');
                return;
            }
            
            const response = await api.post('/review', {
                user: userId,
                restaurent: restaurentId,
                name,
                ratings,
                comments
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Review added successfully", response.data);
            closeReviewForm(); // Close the form after successful submission
            
        } catch (error) {
            if (error.response) {
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>

                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Ratings:</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratings}
                    onChange={(e) => setRatings(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Comments:</label>
                <input
                    type="text"
                    value={comments}
                    placeholder="Enter your comments"
                    onChange={(e) => setComments(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Review</button>
        </form>
    );
};

export default ReviewForm;
