import { Link } from 'react-router-dom';

const RestaurentList = ({ restaurent }) => {
    return (
        <>
            <Link to={`/restaurent/${restaurent._id}`}>
                <img src={restaurent.images} alt={restaurent.name} />
                <div>
                    <h3>Name: {restaurent.name}</h3>
                    <h3>TablesAvailable: {restaurent.availability.Totaltables}</h3>
                </div>
            </Link>
        </>
    );
};

export default RestaurentList;
