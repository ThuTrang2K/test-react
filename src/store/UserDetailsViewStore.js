import { makeAutoObservable } from 'mobx';
import React from 'react';
import { inject } from 'react-ioc';
import UserDetailsDataStore from './UserDetailsDataStore';


class UserDetailsViewStore {
    userDetailsDataStore = inject(this,UserDetailsDataStore )

    constructor(){
        makeAutoObservable(this, undefined, {autoBind:true})
    }

    get detailsLoading(){
        return this.userDetailsDataStore.loading
    }

    get detailsError(){
        return this.userDetailsDataStore.error
    }

    get userDetail(){
        console.log("data",this.userDetailsDataStore.userDetails);
        const data =this.userDetailsDataStore.userDetails;
        if(!data) return null;
        
        data.gender = data.gender === 1 ? "male" : "female";
        // console.log("bitrh1", result.birthday);
        data.birthday = new Date(data.birthday).toISOString().slice(0,10);
        // console.log("bitrh2", result.birthday);
        return data
    }
    get deleteUser(){
        return this.userDetailsDataStore.deleteUser
    }
    get updateUser(){
        return this.userDetailsDataStore.deleteUser
    }
};

export default UserDetailsViewStore;