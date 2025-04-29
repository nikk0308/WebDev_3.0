import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import CreateVenuePage from '../pages/CreateVenuePage';
import VenueListPage from '../pages/VenueListPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import CreateBookingPage from '../pages/CreateBookingPage';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/venues', element: <VenueListPage /> },
  { path: '/venues/create', element: <CreateVenuePage /> },
  { path: '/venues/:venueId/book', element: <CreateBookingPage /> },
  { path: '/bookings', element: <MyBookingsPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
