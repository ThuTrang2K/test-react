import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail/Detail";
import {provider} from "react-ioc"
import UserModalViewStore from "./store/UserModalViewStore";
import UserApi from "./store/UserAPI";
import UsersDataStore from "./store/UsersDataStore";
import UserDetailsDataStore from "./store/UserDetailsDataStore";
import UserDetailsLocationStore from "./store/UserDetailsLocationStore";

const App=provider(UserModalViewStore,UserApi,UsersDataStore, UserDetailsDataStore, UserDetailsLocationStore)(()=> {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/student/:id" element={<Detail />}></Route>
            </Routes>
        </div>
    );
})

export default App;
