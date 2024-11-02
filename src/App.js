import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurentPage from './pages/RestaurentPage';
import Register from './components/register';
import Login from './components/login';
import RestaurentCard from './components/RestaurentCard';
import ReservationForm from './components/ReservationForm';
import GetReview from './components/getReview';
import AdminDashboard from './components/adminDashboard';
import NewRestaurent from './components/addRestaurent';
import UserReview from './components/userReviews';
import GetReservation from './components/getReservation';
import ReplyComment from './components/ReplyComment';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restaurent" element={<RestaurentCard />} />
          <Route path="/restaurent/:id" element={<RestaurentPage/>} />
          <Route path='/reservation' element = {<ReservationForm/>}/>
          <Route path='/get-Review/:id' element={<GetReview/>}/>
          <Route path='/admin-Dashboard' element={<AdminDashboard/>}/>
          <Route path='/add-Restaurent' element={<NewRestaurent/>}/>
          <Route path='/get-Review' element={<UserReview/>}/>
          <Route path='/user-Reservation/:id' element={<GetReservation/>}/>
          <Route path='/reply-Comment/:reviewId' element={<ReplyComment/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
