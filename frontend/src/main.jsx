import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import Agenda from './Composants/Agenda/Agenda.jsx'
import UserAgenda from './Composants/Agenda/UserAgenda.jsx'
import ClientRegister from './Composants/ClientRegister/ClientRegister.jsx';
import ClientLogin from './Composants/ClientLogin/ClientLogin.jsx';
import CompanyRegister from './CompanyRegister/CompanyRegister.jsx';
import CompanyLogin from './CompanyLogin/CompanyLogin.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/CompanyHome",
    element: <Agenda />,
  },
  {
    path: "/register/clients",
    element: <ClientRegister />,
  },
  {
    path: "/login/clients",
    element: <ClientLogin />,
  },
  {
    path: "/register/companies",
    element: <CompanyRegister />,
  },
  {
    path: "/login/companies",
    element: <CompanyLogin />,
  },
  {
    path: "/userHome",
    element: <UserAgenda />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);