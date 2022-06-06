import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import warehouseReducer from "./warehouseReducer";
import productsReducer from "./productsReducer";

export default combineReducers({
	themeReducer,
	warehouseReducer,
	productsReducer
});
