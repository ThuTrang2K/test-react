import { makeAutoObservable, runInAction } from 'mobx';
import { inject } from 'react-ioc';
import UserApi from './UserAPI';

class UsersDataStore  {
    UserApi = inject(this, UserApi)
    response=[];
    constructor() {
        console.log('Created: UserDataStore');
        makeAutoObservable(this, undefined,{autoBind:true})
        this.read();
    }
    async read() {
        const response =await this.UserApi.getUsers()
        runInAction(()=>{
            this.response = response;
        })
    }
};

export default UsersDataStore;