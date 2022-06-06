import { omit } from "lodash";
import {
	ADD_PRODUCTS,
    REMOVE_PRODUCTS,
    CHANGE_PRODUCTS_INFO,
} from "@store/constants/actionTypes";
import { getLocalStorage } from "@utils/localStorage";


const initialState = getLocalStorage("products");

const productsReducer = (state = initialState || {}, action) => {
    
	switch (action.type) {
		case ADD_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_PRODUCTS:
            return omit(state, [action.payload])
        case CHANGE_PRODUCTS_INFO:
            return
		default:
			return state;
	}
};

export default productsReducer;
