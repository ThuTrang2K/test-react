import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class UsersDataStore  {
    usersList=[];
    totaPage=0;
    total =0;

    constructor() {
        makeAutoObservable(this)
    }
    async getUsers(page=0) {
        const response =await axios.get(
                `https://prod.example.fafu.com.vn/employee?page=${page}&size=10`
            );
        runInAction(()=>{
            console.log(response.data);
            this.usersList = response.data.data;
            this.totaPage= response.data.total_page;
            this.total= response.data.total_count
        })
    }
};

export default UsersDataStore;