const initState = {
    notification: null, 
    state: 'safe' 
}
const noticeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'DANGER': {
            return {
                notification: action.message,
                state: action.state
            }
        }
        case 'SAFE': {
            return {
                notification: action.message,
                state: action.state
            }
        }
        case 'NULL': {
            return {
                notification: null,
                state: action.state
            }
        }
        default:
            return state
    }
}

export const dangerAction = (message, seconds) => { 
    return dispatch => {
        dispatch({
            type: 'DANGER',
            state: 'danger',
            message
        })
        setTimeout(() => {
            dispatch(nullAction())
        }, seconds * 1000)
    }
    
}

export const safeAction = (message, seconds) => {
    return dispatch => {
        dispatch({
            type: 'SAFE',
            state: 'safe',
            message
        })
        setTimeout(() => {
            dispatch(nullAction())
        }, seconds * 1000)
    }
}

const nullAction = () => {
    return {
        type: 'NULL',
        state: 'safe',
    }
}

export default noticeReducer