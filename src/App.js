import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/DetailUser/Detail";


const App= ()=> {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/student/:id" element={<Detail />}></Route>
            </Routes>
        </div>
    );
}

export default App;
