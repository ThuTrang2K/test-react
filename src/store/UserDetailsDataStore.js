import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";

class UserDetailsDataStore {
    user = {};
    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
    }
    async getUserById(id) {
        const response = await axios.get(
            `https://prod.example.fafu.com.vn/employee/${id}`
        );
        runInAction(() => {
            response.data.gender =
                response.data.gender === 1 ? "male" : "female";
            response.data.birthday = new Date(response.data.birthday)
                .toISOString()
                .slice(0, 10);
            this.user = response.data;
        });
    }

    async addUser(data){
        return await axios.post(
            `https://prod.example.fafu.com.vn/employee`,
            {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday,
                gender: data.gender,
            })
    }
    
    async deleteUser(id){
        return await axios.delete(
            `https://prod.example.fafu.com.vn/employee/${id}`
        )
    }

    async UpdateUser(data,id){
        return await axios.put(
            `http://prod.example.fafu.com.vn/employee/${id}?`,
            {
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday,
                gender: data.gender,
            }
        );
    }
}

export default UserDetailsDataStore;
