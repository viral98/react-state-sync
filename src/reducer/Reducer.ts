import { actionTypes, BaseActions } from "../actions/BaseActions";


export function reduce<T extends any[]>(state: T, action: BaseActions<T>) : T {
    console.log("Reducer called with: " + action.actionType);
    switch (action.actionType) {
        case actionTypes.UPDATE:
            console.log("Update the store here");
            break;

        case actionTypes.POST: {
            const newState = {...state};
            newState.push(action.payload);

            return newState;
        }
        case actionTypes.DELETE:
            console.log("Delete values from the store here");
            break;

        default:
            console.error("Action must be a predefined actionType.");
    }

    //returning a placeholder here. This should return the updated store.
    return state;
}


