import { useState } from 'react';
import api from "../api";

const DeleteReview = ({ reviewId, onDelete }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            await api.delete(`/delete-Review/${reviewId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Review deleted successfully");
            if (onDelete) onDelete(reviewId); // Callback to update the list
        } catch (err) {
            console.error("Error deleting the review:", err);
            setError("Failed to delete review. Please try again.");
            console.log(reviewId)
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={handleDelete} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">Delete Review</button>
        </div>
    );
};

export default DeleteReview;
