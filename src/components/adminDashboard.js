import { Link } from "react-router-dom";
import RestaurantSearch from "./Search";

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="space-y-4">
                <Link to='/get-Review' className="block p-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                    Get all the reviews
                </Link>
                
                <Link to="/restaurent" className="block p-4 bg-green-600 text-white rounded hover:bg-green-500 transition">
                    Get all the restaurants
                </Link>
                
                <Link to="/add-Restaurent" className="block p-4 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition">
                    Add restaurant
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
