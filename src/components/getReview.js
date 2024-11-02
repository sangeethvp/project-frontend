import api from "../api";
import { useEffect, useState } from "react";
import DeleteReview from "./DeleteReview";
import UpdateReview from "./updateReview";

const GetReview = () => {
    const [review, setReview] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const closeForm = () => {
        setShowForm(false);
    };

    useEffect(() => {
        const getReview = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await api.get(`/get-userReview/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReview(response.data);
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
        getReview();
    }, []);

    const removeReviewFromList = (reviewId) => {
        setReview(prevReview => prevReview.filter(review => review._id !== reviewId));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Reviews</h2>
            {review.length > 0 ? (
                review.map((review) => (
                    <div key={review._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <ul className="space-y-2">
                            <li className="text-lg font-semibold">Name: {review.name}</li>
                            <li>Ratings: <span className="font-medium">{review.ratings}</span></li>
                            <li>Comments: {review.comments}</li>
                            <li>Date: {review.Date}</li>
                            <li>Reply: {review.reply || "No reply"}</li>
                        </ul>
                        <div className="flex justify-between mt-4">
                            <DeleteReview reviewId={review._id} onDelete={removeReviewFromList} />
                            <button 
                                onClick={() => setShowForm(true)} 
                                className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Update Review
                            </button>
                        </div>
                        {showForm && <UpdateReview reviewId={review._id} currentReview={review} closeForm={closeForm} />}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No reviews found</p>
            )}
        </div>
    );
};

export default GetReview;
