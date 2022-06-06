import { omit } from "lodash";
import {
	ADD_WAREHOUSE,
    REMOVE_WAREHOUSE,
    CHANGE_WAREHOUSE_INFO,
    ADD_PRODUCTS_TO_WAREHOUSE,
    REMOVE_PRODUCTS_FROM_WAREHOUSE
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
        case CHANGE_WAREHOUSE_INFO:
            return
        case ADD_PRODUCTS_TO_WAREHOUSE:
            return
		default:
			return state;
	}
};

export default warehouseReducer;
