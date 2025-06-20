import Home from "./pages/Home";
import Allbooks from "./pages/Allbooks";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, useSearchParams } from "react-router-dom";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBooksDetails from "./components/ViewBookDeatils/ViewBooksDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Favourites from "./components/Profile/Favourites";
import UserOrderrHistory from "./components/Profile/UserOrderrHistory";
import Settings from "./components/Profile/Settings";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/all-books" element={<Allbooks />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          
          <Route index element={<Favourites />} />
          <Route path="/profile/orderHistory" element={<UserOrderrHistory />} />
          <Route path="/profile/settings" element={<Settings/>}/>

        </Route>

        <Route path="view-book-details/:id" element={<ViewBooksDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
