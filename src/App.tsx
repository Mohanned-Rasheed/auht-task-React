import { Routes, Route, useNavigate } from "react-router-dom";
import SginIn from "./pages/Sginin";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Home from "./pages/Home";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./state/user/userSlice";
import { useState } from "react";
import RegisterAfter from "./pages/RegisterAfter";
import Loader from "./components/Loader";
import Edit from "./pages/Edit";
import Header from "./components/Header";
function App() {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setUser(user));
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        navigate("/RegisterAfter");
      }
    } else {
      dispatch(setUser(null));
      window.localStorage.clear();
    }

    if (!isLodaing) {
      setIsLoading(true);
    }
  });
  const navigate = useNavigate();
  let [isLodaing, setIsLoading] = useState(false);
  return (
    <>
      {" "}
      {isLodaing ? (
        <Routes>
          <Route path="/login" Component={SginIn}></Route>
          <Route path="sginup" Component={Register}></Route>
          <Route path="/forgotpassword" Component={ForgotPass}></Route>
          <Route path="/" Component={Home}></Route>
          <Route path="/RegisterAfter" Component={RegisterAfter}></Route>
          <Route path="/edit" Component={Edit}></Route>
        </Routes>
      ) : (
        <Loader hight={"100vh"}/>
      )}
    </>
  );
}

export default App;
