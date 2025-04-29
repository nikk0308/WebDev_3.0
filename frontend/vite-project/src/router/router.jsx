import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
