
import { useEffect, useState } from "react";
import api from "../api";
import RestaurentList from "./RestaurentList";
import { Link } from "react-router-dom";
import RestaurantSearch from "./Search";

const RestaurantCard = () => {
    const [restaurents, setRestaurents] = useState([]);

    useEffect(() => {
        const getRestaurents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await api.get('/restaurent', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setRestaurents(response.data);
            } catch (error) {
                console.error('Error loading restaurants:', error.message);
            }
        };
        getRestaurents();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
                        <RestaurantSearch/>

            <div className="flex justify-center space-x-6 mb-6">
                <Link
                    to='/get-Review/:id'
                    className="text-blue-600 hover:underline font-medium"
                >
                    See My Reviews
                </Link>
                <Link
                    to='/user-Reservation/:id'
                    className="text-blue-600 hover:underline font-medium"
                >
                    See My Reservations
                </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restaurents.length > 0 ? (
                    restaurents.map((restaurent) => (
                        <div
                            key={restaurent._id}
                            className="bg-gray-100 p-4 rounded-lg border border-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"

                        >
                            <RestaurentList restaurent={restaurent} />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 text-lg">No restaurants found</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantCard;


