import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewStudent from "./pages/Add/AddNewStudent";
import Detail from "./pages/Detail/Detail";
import Add from "./pages/Add/Add";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    ></Route>
                    <Route
                        path="/student/:id"
                        element={<Detail />}
                    ></Route>
                    <Route
                        path="/test"
                        element={<Add />}
                    ></Route>
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
