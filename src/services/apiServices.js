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
export { postCreateNewuser, getAllUsers }