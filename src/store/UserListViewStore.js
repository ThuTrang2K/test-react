import { makeAutoObservable } from 'mobx';
import React from 'react';
import { inject } from 'react-ioc';
import UsersDataStore from './UsersDataStore';

class UserListViewStore {
    usersDataStore = inject(this, UsersDataStore);
    constructor(){
        console.log('CREATED: UserListViewStore');
        makeAutoObservable(this, undefined,{autoBind: true})
    }
    get users(){
        return this.usersDataStore.response.map((user) =>({
            id: user.id,
            username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                address: user.address,
                birthday: user.birthday,
                gender: user.gender,

        }))
    }
};

export default UserListViewStore;