import { makeAutoObservable } from 'mobx';
import React from 'react';
import { useParams } from 'react-router-dom';

class UserDetailsLocationStore {
    params  = useParams();
    constructor(){
        makeAutoObservable(this,undefined,{autoBind:true})
    }
    get getId(){
        return this.params.id
    }
};

export default UserDetailsLocationStore;
