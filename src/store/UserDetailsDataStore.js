import { makeAutoObservable, runInAction } from 'mobx';
import React from 'react';
import { inject } from 'react-ioc';
import UserApi from './UserAPI';
import UserDetailsLocationStore from './UserDetailsLocationStore';

class UserDetailsDataStore  {
    locationStore = inject(this, UserDetailsLocationStore)
    user
    userApi= inject(this,UserApi)

    state ={
        loading: false,
        error:'',
        response:null
    }

    constructor(){
        makeAutoObservable(this,undefined,{autoBind:true})
        this.read();
    }

    get loading(){
        return this.state.loading;
    }

    get error(){
        return this.state.error
    }

    get userDetails(){
        return this.state.response
    }

    async read(){
        this.state.response= null;
        this.state.loading = true;
        this.state.error ='';
        try {
            const response = await this.userApi.getUserDetails(this.locationStore.getId)
            runInAction(()=>{
                this.state.response = response.data;
                this.state.loading = false;
            })
        }
        catch(e){
            runInAction(()=>{
                this.state.error = 'Connection problem...'
                this.state.loading= false
            })
        }
    }
    
    async deleteUser(){
        this.state.response= null;
        this.state.loading = true;
        this.state.error ='';
        try {
            await this.userApi.deleteUser(this.locationStore.getId)
            runInAction(()=>{
                this.state.loading = false;
            })
            return true
        }
        catch(e){
            runInAction(()=>{
                this.state.error = 'Connection problem...'
                this.state.loading= false
            })
            return false
        }
    }
    async updateUser(data){
        this.state.response= null;
        this.state.loading = true;
        this.state.error ='';
        try {
            await this.userApi.UpdateUser(data, this.locationStore.getId)
            runInAction(()=>{
                this.state.loading = false;
            })
            return true
        }
        catch(e){
            runInAction(()=>{
                this.state.error = 'Connection problem...'
                this.state.loading= false
            })
            return false
        }
    }
};

export default UserDetailsDataStore;