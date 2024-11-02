
import NavBar from "./NavBar";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h1 className="text-4xl font-bold text-center text-blue-600 mt-8 sm:mt-0">
                    Welcome to the Restaurant Reservation
                </h1>

            </div>
        </>
    );
};

export default HomePage;
