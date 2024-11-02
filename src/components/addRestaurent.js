
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const NewRestaurent = () => {
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [menu, setMenu] = useState([{ food: "", price: "" }]);
    const [availability, setAvailability] = useState({ Totaltables: "", Booked: 0 });
    const [images, setImages] = useState('');
    const [place, setPlace] = useState({ city: "", address: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleMenuChange = (index, field, value) => {
        const updatedMenu = [...menu];
        updatedMenu[index][field] = value;
        setMenu(updatedMenu);
    };

    const addMenuItem = () => {
        setMenu([...menu, { food: "", price: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurentData = {
            name,
            cuisine: cuisine.split(',').map(item => item.trim()), 
            menu,
            availability,
            images,
            place
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await api.post("/add-Restaurent", restaurentData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("Restaurant Saved Successfully:", response.data);
            setMessage("Restaurent saved successfully");

            setTimeout(() => {
                navigate('/admin-Dashboard');
            }, 2000);
        } catch (error) {
            console.error("Error adding the restaurant:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Add New Restaurant</h1>
            {message && <div className="mb-4 text-green-500">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter the name of the restaurant"
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Cuisine:</label>
                    <input
                        type="text"
                        value={cuisine}
                        placeholder="Enter the cuisine types of the restaurant"
                        onChange={(e) => setCuisine(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Menu :</label>
                    {menu.map((item, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="Food"
                                value={item.food}
                                onChange={(e) => handleMenuChange(index, 'food', e.target.value)}
                                required
                                className="border border-gray-300 rounded p-2 flex-1"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                                required
                                className="border border-gray-300 rounded p-2 flex-1"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addMenuItem} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-green-500">
                        Add Menu Item
                    </button>
                </div>

                <div>
                    <label className="block mb-1">Total Tables</label>
                    <input
                        type="number"
                        value={availability.Totaltables}
                        placeholder="Enter the number of tables in the restaurant"
                        onChange={(e) => setAvailability({ ...availability, Totaltables: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Images URL</label>
                    <input
                        type="text"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">City</label>
                    <input
                        type="text"
                        value={place.city}
                        onChange={(e) => setPlace({ ...place, city: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block mb-1">Address</label>
                    <input
                        type="text"
                        value={place.address}
                        onChange={(e) => setPlace({ ...place, address: e.target.value })}
                        required
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                <button type="submit" className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-green-500">
                    Add Restaurant
                </button>
            </form>
        </div>
    );
};

export default NewRestaurent;
