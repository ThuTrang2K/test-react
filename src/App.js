import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail/Detail";

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
                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
