import { BrowserRouter, Routes, Route } from "react-router-dom";
import SginIn from "./pages/Sginin";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Home from "./pages/Home";
function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="*" Component={SginIn}></Route>
          <Route path="register" Component={Register}></Route>
          <Route path="/forgotpass" Component={ForgotPass}></Route>
          <Route path="/" Component={Home}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
