import axios from "../utils/axiosCustomize";

const postCreateNewuser = (email, password, username, role, image) => {
    //data can cho api
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    //data can cho api
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);//form data
}
const deleteUser = (userId) => {
    //axios yeu cau bien data
    return axios.delete('api/v1/participant', { data: { id: userId } });
    //truyen userId cho api
};
const getUserWithPaginate = (page, limit) => {
    //axios yeu cau bien data
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
    //truyen userId cho api
};
const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword });
}
const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
}
export { postCreateNewuser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister }