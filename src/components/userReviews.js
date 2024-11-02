

import { useEffect, useState } from "react";
import api from "../api";
import ReplyComment from "./ReplyComment";

const UserReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getUserReview = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await api.get('/get-Review', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error loading reviews:', error.message);
            }
        };
        getUserReview();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                            <ul className="list-disc pl-5">
                                <li className="font-bold">Rating: {review.ratings}/5</li>
                                <li>Comment: {review.comments}</li>
                                <li>Date: {new Date(review.date).toLocaleDateString()}</li>
                            </ul>
                            <ReplyComment reviewId={review._id} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-lg">No reviews available.</p>
            )}
        </div>
    );
};

export default UserReview;
