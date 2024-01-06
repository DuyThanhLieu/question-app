export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_thanh' //doi ten o day
export const doLogin = (data) => {
    return {

        //action
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}