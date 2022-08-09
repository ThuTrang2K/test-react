import React from 'react';
import {makeAutoObservable} from 'mobx'

class UserModalViewStore  {
    opened = false;
    constructor(){
        makeAutoObservable(this, undefined, {autoBind:true})
    }
    open() {
        this.opened= true
    }
    close() {
        this.opened = false
    }
};

export default UserModalViewStore;