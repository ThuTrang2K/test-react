import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewStudent from "./pages/Add/AddNewStudent";

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
                        path="/add-student"
                        element={<AddNewStudent />}
                    ></Route>
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
