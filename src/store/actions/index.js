import { CHANGE_THEME } from "@store/constants/actionTypes";

export const changeTheme = (theme) => ({
	type: CHANGE_THEME,
	payload: theme,
});
