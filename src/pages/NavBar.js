

import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="text-2xl font-semibold">Reservation</p>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/register" className="hover:text-blue-300 transition">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-blue-300 transition">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default NavBar;
