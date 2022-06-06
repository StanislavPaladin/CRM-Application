import { CHANGE_THEME, ADD_WAREHOUSE, REMOVE_WAREHOUSE, ADD_PRODUCTS, REMOVE_PRODUCTS } from "@store/constants/actionTypes";

export const changeTheme = (theme) => ({
	type: CHANGE_THEME,
	payload: theme,
});

export const addWarehouse = (warehouse) => ({
	type: ADD_WAREHOUSE,
	payload: warehouse,
})

export const removeWarehouse = (id) => ({
	type: REMOVE_WAREHOUSE,
	payload: id,
})

export const addProducts = (products) => ({
	type: ADD_PRODUCTS,
	payload: products,
})

export const removeProducts = (id) => ({
	type: REMOVE_PRODUCTS,
	payload: id,
})