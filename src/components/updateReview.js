import { useState, useEffect } from "react";
import api from "../api";

const UpdateReview = ({ reviewId, currentReview, onUpdate,closeForm }) => {
    const [ratings, setRatings] = useState(currentReview.ratings || '');
    const [comments, setComments] = useState(currentReview.comments || '');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setRatings(currentReview.ratings);
        setComments(currentReview.comments);
    }, [currentReview]);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found. Please log in.');
                return;
            }

            const response = await api.put(`/update-Review/${reviewId}`, { ratings, comments }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage('Review updated successfully!');
            if (onUpdate) onUpdate(response.data.review); // Update the state with the new review data
            setTimeout(()=>{
                closeForm();
            },2000)
           
        } catch (err) {
            console.error('Error updating the review:', err);
            setMessage('Error updating the review. Please try again.');
        }
    };

    return (
        <div>
            <h3>Update Review</h3>
            <label>
                Ratings:
                <input
                    type="number"
                    value={ratings}
                    onChange={(e) => setRatings(e.target.value)}
                />
            </label>
            <label>
                Comments:
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </label>
            <button onClick={handleUpdate}>Update Review</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateReview;
