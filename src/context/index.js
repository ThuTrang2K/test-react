import React, { createContext, useContext } from 'react';
import UserDetailsDataStore from '../store/UserDetailsDataStore';
import UserModalViewStore from '../store/UserModalViewStore';
import UsersDataStore from '../store/UsersDataStore';

const StudentContext = createContext();

function StudentProvider(props){
    const userStore = new UsersDataStore();
    const modelStore = new UserModalViewStore()
    const userDetailStore= new UserDetailsDataStore()
    const value={userStore,modelStore,userDetailStore}
    return <StudentContext.Provider {...props} value={value}></StudentContext.Provider>
}
export {StudentContext,StudentProvider}

