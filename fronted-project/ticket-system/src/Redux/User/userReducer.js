import * as userType from './userType'

const START_STATE = {};

const userReducer = (state = START_STATE, action) => {
    switch (action.type) {
        case userType.USER_SET_DATA:
            return action.payload;
        case userType.USER_REMOVE_DATA:
            return {};
        default:
            return state
    }
};

export default userReducer;