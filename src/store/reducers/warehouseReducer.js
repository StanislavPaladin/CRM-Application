import { omit } from "lodash";
import {
	ADD_WAREHOUSE,
    REMOVE_WAREHOUSE
} from "@store/constants/actionTypes";
import { getLocalStorage } from "@utils/localStorage";


const initialState = getLocalStorage("warehouses");

const warehouseReducer = (state = initialState || {}, action) => {
    
	switch (action.type) {
		case ADD_WAREHOUSE:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_WAREHOUSE:
            return omit(state, [action.payload])
		default:
			return state;
	}
};

export default warehouseReducer;
