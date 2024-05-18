import { BrowserRouter, Routes, Route } from "react-router-dom";
import SginIn from "./pages/Sginin";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Home from "./pages/Home";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user/userSlice";
import { RootState } from "./state/store";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
      window.localStorage.clear();
    }
    if (!isLodaing) {
      setIsLoading(true);
    }
  });
  let [isLodaing, setIsLoading] = useState(false);
  const docRef = doc(db, "cities", "SF");
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      {" "}
      {isLodaing ? (
        <BrowserRouter>
          <Routes>
            <Route path="/login" Component={SginIn}></Route>
            <Route path="sginup" Component={Register}></Route>
            <Route path="/forgotpassword" Component={ForgotPass}></Route>
            <Route path="/" Component={Home}></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
