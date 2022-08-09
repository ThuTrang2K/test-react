import axios from "axios"

class UserApi {
     async getUsers() {
        const response = await axios.get(
            `https://prod.example.fafu.com.vn/employee?page=0&size=10`
        );
            return response.data.data    
    }

    async getUserDetails(id){
        const response =await axios.get(
            `https://prod.example.fafu.com.vn/employee/${id}`
        );
        return response
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

export default UserApi;
