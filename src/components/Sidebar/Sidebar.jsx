import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { themeSelector } from "@store/constants/selectors";
import {
	THEME_DARK,
	THEME_LIGHT,
} from "@store/constants/actionTypes";
import { changeTheme } from "@store/actions";

import logo from "./img/logo.svg";
import cartLight from "./img/cart-light.svg";
import cartDark from "./img/cart-dark.svg";
import homeLight from "./img/home-light.svg";
import homeDark from "./img/home-dark.svg";
import themeDark from "./img/theme-dark.svg";
import themeLight from "./img/theme-light.svg";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
	const dispatch = useDispatch();

	const [cartIcon, setCartIcon] = useState(null);
	const [homeIcon, setHomeIcon] = useState(null);
	const [themeIcon, setThemeIcon] = useState(null);

	const dispatchTheme = (themeName) => {
		dispatch(changeTheme(themeName));
	};
	const theme = useSelector(themeSelector);

	useEffect(() => {
		switch (theme) {
			case 'dark':
				setCartIcon(cartDark);
				setHomeIcon(homeDark);
				setThemeIcon(themeLight);
				break;
			case 'light':
				setCartIcon(cartLight);
				setHomeIcon(homeLight);
				setThemeIcon(themeDark);
				break;	
			default: return
		}

	}, [theme]);

	return (
		<div className={styles.container}>
			<ul className={styles.list__container}>
				<div className={styles.logo__wrapper}>
					<img className={styles.logo} src={logo} alt="logo" />
				</div>
				<li className={styles.link}>
					<NavLink to="/" exact="true">
						<img
							className={styles.icon}
							src={homeIcon}
							alt="home"
						/>
					</NavLink>
				</li>
				<li className={styles.link}>
					<NavLink to="/cart" exact="true">
						<img
							className={styles.icon}
							src={cartIcon}
							alt="cart"
						/>
					</NavLink>
				</li>
			</ul>
			<ul className={styles.theme__container}>
				<div className={styles.theme__switcher}>
					<img
						onClick={() => dispatchTheme(theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT)}
						className={styles.icon__theme}
						src={themeIcon}
						alt="home"
					/>
				</div>
				<div className={styles.language__switcher}></div>
			</ul>
		</div>
	);
};

export default Sidebar;
