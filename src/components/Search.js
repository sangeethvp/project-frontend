import React, { useState } from 'react';
import api from '../api';





const RestaurentSearch = () => {
    const [cuisine, setCuisine] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e, type) => {
        e.preventDefault();
        setError('');
        try {
            let response;
            if (type === 'cuisine') {
                response = await api.get('/findRestaurentCuisine', { cuisine });
            } else if (type === 'place') {
                response = await api.get('/findRestaurentPlace', { place: { city, address } });
            } else if (type === 'price') {
                response = await api.get('/findRestaurentPrice', { params: { minPrice, maxPrice } });
            }
            setResults(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error fetching data');
        }
    };






    return (
        <div>
            <h1>Search Restaurants</h1>

            <form onSubmit={(e) => handleSearch(e, 'cuisine')}>
                <input
                    type="text"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Cuisine"
                />
                <button type="submit">Search by Cuisine</button>
            </form>

            <form onSubmit={(e) => handleSearch(e, 'place')}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <button type="submit">Search by Location</button>
            </form>

            <form onSubmit={(e) => handleSearch(e, 'price')}>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min Price"
                />
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max Price"
                />
                <button type="submit">Search by Price</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {results.length > 0 && (
                <ul>
                    {results.map((restaurent) => (
                        <li key={restaurent._id}>
                            <strong>{restaurent.name}</strong>
                            <p>Cuisine: {restaurent.cuisine.join(', ')}</p>
                            <p>Location: {restaurent.place.city}, {restaurent.place.address}</p>
                            <p>Price Range: {restaurent.menu.map(item => `${item.food}: $${item.price}`).join(', ')}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};







export default RestaurentSearch;
