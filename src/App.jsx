import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./pages/common/header/header";
// import { Footer } from "./pages/common/footer/Footer";
import Home from "./pages/Home/Home";
// import GanttChart from "./pages/Chart/Chart";
// import Infos from "./pages/Infos/Infos";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/chart' element={<GanttChart />}></Route> */}
        {/* <Route path='/infos' element={<Infos />}></Route> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
