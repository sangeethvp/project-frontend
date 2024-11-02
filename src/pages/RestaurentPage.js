

import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from 'react-router-dom';
import ReservationForm from "../components/ReservationForm";
import ReviewForm from "../components/ReviewForm";

const Restaurent = () => {
    const { id } = useParams();
    const [restaurent, setRestaurent] = useState(null);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const closeReviewForm = () => {
        setShowReviewForm(false);
    };

    const closeReservationForm = () => {
        setShowForm(false);
    };

    useEffect(() => {
        const getRestaurentDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await api.get(`/restaurent/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRestaurent(response.data);
            } catch (err) {
                setError("Failed to load restaurant details. Please try again.");
                console.error(err);
            }
        };
        getRestaurentDetails();
    }, [id]);

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    if (!restaurent) {
        return <div className="text-center text-gray-500 mt-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
                <img src={restaurent.images} alt={restaurent.name} className="w-full h-64 object-cover rounded-md mb-4" />
                
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{restaurent.name}</h3>
                    <p className="text-gray-600"><strong>Cuisine:</strong> {restaurent.cuisine?.join(", ")}</p>
                    <p className="text-gray-600"><strong>Menu:</strong> {restaurent.menu?.map(item => `${item.food} (${item.price})`).join(", ")}</p>
                    <p className="text-gray-600"><strong>Availability:</strong> {restaurent.availability?.Totaltables}</p>
                    <p className="text-gray-600"><strong>Place:</strong> {restaurent.place?.map(item => `${item.city} (${item.address})`).join(", ")}</p>
                </div>

                <div className="w-full mt-6">
                    <h4 className="text-lg font-medium text-gray-700">Reviews:</h4>
                    {restaurent.reviews && restaurent.reviews.length > 0 ? (
                        restaurent.reviews.map(review => (
                            <div key={review._id} className="bg-gray-100 rounded-md p-4 my-2">
                                <p><strong>Name:</strong> {review.name}</p>
                                <p><strong>Rating:</strong> {review.ratings}/5</p>
                                <p><strong>Comment:</strong> {review.comments}</p>
                                <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}
                </div>

                <div className="flex space-x-4 mt-6">
                    <button
                        onClick={() => setShowReviewForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Give Feedback
                    </button>
                    {showReviewForm && <ReviewForm closeReviewForm={closeReviewForm} />}
                    
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                    >
                        Make a Reservation
                    </button>
                    {showForm && <ReservationForm closeReservationForm={closeReservationForm} />}
                </div>
            </div>
        </div>
    );
};

export default Restaurent;
