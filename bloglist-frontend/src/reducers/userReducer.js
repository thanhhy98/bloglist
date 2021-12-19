import loginService from '../services/login' 

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_USER': {
            return action.user
        }
        case 'LOGIN': {
            return action.user
        }
        case 'LOGOUT': {
            return null
        }
        default: 
            return state
    }
}

export const initUser = () => {
        return dispatch => {
            const strUser = localStorage.getItem('blogUser');
            if(strUser) {
                const user = JSON.parse(strUser);
                dispatch({
                    type: 'INIT_USER',
                    user
                })
        }
    }
}

export const login = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials);
        localStorage.setItem('blogUser', JSON.stringify(user))
        dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export const logOut = () => {
    return {
        type: 'LOGOUT',
    }
}

export default userReducer