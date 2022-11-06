import * as userType from './userType'

export const userSetData = (data) => {
    return {
        type: userType.USER_SET_DATA,
        payload: data
    };
};

export const userRemoveData = () => {
    return {
        type: userType.USER_REMOVE_DATA,
        payload: {}
    };
};
