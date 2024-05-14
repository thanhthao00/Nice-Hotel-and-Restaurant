import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Book from './pages/book/Book';
import BookRooms from './pages/book/book-rooms/BookRooms';
import BookTable from './pages/book/booktable/BookTable';
import RoomsPage from './pages/RoomsPage/RoomsPage';
import Menu from './pages/menu/Menu';
import Log from './components/Log/Log'
import LogAndSignUser from './pages/LoginUser/LogAndSignUser';
import AboutAndContact from './pages/AboutAndContact/AboutAndContact';
import RegisterForm from './pages/login/RegisterForm';
import Feedback from './pages/Feedback/Feedback'
import Staff from './pages/staff/Staff';
import System_Admin from './pages/System_Admin/System_Admin';
import ManageUser from './pages/ManageUser/ManageUser';
import ManageStaff from './pages/manage Staff/ManageStaff';
import ManageRooms from './pages/Manage Rooms/ManageRooms';
import ManageTable from './pages/ManageTables/ManageTable';
import ManageDish from './pages/ManageDish/ManageDish';
import Bill from './pages/bill/Bill';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "book",
    element: <Book />,
  },
  {
    path: "book-rooms",
    element: <BookRooms />,
  },
  {
    path: "book-tables",
    element: <BookTable/>,
  },
  {
    path: "rooms-page",
    element: <RoomsPage/>,
  },
  {
    path: "menu",
    element: <Menu/>,
  },
  {
    path: "log",
    element: <Log/>,
  },
  {
    path: "Login_user",
    element: <LogAndSignUser/>,
  },
  {
    path: "about",
    element: <AboutAndContact/>,
  },
  {
    path: "feedback",
    element: <Feedback/>,
  },
  {
    path: "user",
    element: <Staff />,
  },
  {
    path: "System_Admin",
    element: <System_Admin />,
  },
  {
    path: "manage_user",
    element: <ManageUser />,
  },
  {
    path: "manage_staff",
    element: <ManageStaff />,
  },
  {
    path: "register_staff",
    element: <RegisterForm />,
  },
  {
    path: "manage_room",
    element: <ManageRooms />,
  },
  {
    path: "manage_table",
    element: <ManageTable />,
  },
  {
    path: "manage_dish",
    element: <ManageDish />,
  },
  {
    path: "thankyou",
    element: <Bill />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


