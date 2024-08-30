import { Route, Routes } from 'react-router-dom';
import './App.css';

import OrderPage from './Pages/OrderPage/OrderPage';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ProfilePage from './Pages/ReviewPage/ProfilePage';
import { UserProvider } from './Context/userContext';
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route
            path="/orderpage"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/menupage"
            element={
              <PrivateRoute>
                <MenuPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profilepage"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
