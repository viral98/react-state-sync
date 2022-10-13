export enum actionTypes {
    UPDATE = "update",
    POST = "post",
    DELETE = "delete"
}

export interface BaseActions<T extends any[]> {
    actionType: actionTypes,
    payload: T
}

