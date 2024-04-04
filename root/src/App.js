// import logo from './logo.svg';
import './App.css';
import Home from './Pages/HomePage.js';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import { CartProvider } from './units/ContextReducer.js';

import MyOrderPage from './Pages/MyOrderPage.js';
import LoginPage from './Pages/LoginPage.js';
import SignupPage from './Pages/SignupPage.js';
import HomePage from './Pages/HomePage.js';
import DashboardPage from './Pages/DashboardPage.js';
// import '../node_modules/bootstrap/dist/js/.'
function App() {
  return (
    <CartProvider>
    <Router>
    <div><Routes>
      <Route exact path = "/" element = {<HomePage/>}/>
      <Route exact path = "/login" element = {<LoginPage/>}/>
      <Route exact path = "/createuser" element = {<SignupPage/>}/>
      <Route exact path="/myOrder" element={<MyOrderPage />} />
      <Route exact path="/dashboard" element={<DashboardPage />} />

      </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
