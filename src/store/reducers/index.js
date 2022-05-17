import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import warehouseReducer from "./warehouseReducer";

export default combineReducers({
	themeReducer,
	warehouseReducer
});
