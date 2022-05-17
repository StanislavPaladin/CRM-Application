import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { themeSelector } from "@store/constants/selectors";
import { THEME_DARK, THEME_LIGHT } from "@store/constants/actionTypes";
import { changeTheme } from "@store/actions";

import logo from "./img/logo.svg";
import cartLight from "./img/cart-light.svg";
import cartDark from "./img/cart-dark.svg";
import homeLight from "./img/home-light.svg";
import homeDark from "./img/home-dark.svg";
import themeDark from "./img/theme-dark.svg";
import themeLight from "./img/theme-light.svg";
import warehouseDark from "./img/warehouse-dark.svg";
import warehousesLight from "./img/warehouse-light.svg";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
	const dispatch = useDispatch();
	const dispatchTheme = (themeName) => {
		dispatch(changeTheme(themeName));
	};
	const theme = useSelector(themeSelector);

	const [cartIcon, setCartIcon] = useState(cartLight);
	const [homeIcon, setHomeIcon] = useState(homeLight);
	const [themeIcon, setThemeIcon] = useState(themeDark);
	const [warehoseIcon, setWarehouseIcon] = useState(warehousesLight);


	useEffect(() => {
		// default theme if no theme saved for user
		!theme.length && dispatchTheme(THEME_LIGHT);
	}, []);

	useEffect(() => {
		switch (theme) {
			case "dark":
				setCartIcon(cartDark);
				setHomeIcon(homeDark);
				setThemeIcon(themeLight);
				setWarehouseIcon(warehouseDark);
				break;
			case "light":
				setCartIcon(cartLight);
				setHomeIcon(homeLight);
				setThemeIcon(themeDark);
				setWarehouseIcon(warehousesLight);
				break;
			default:
				setCartIcon(cartLight);
				setHomeIcon(homeLight);
				setThemeIcon(themeDark);
				setWarehouseIcon(warehousesLight);
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
					<NavLink to="/products" exact="false">
						<img
							className={styles.icon}
							src={cartIcon}
							alt="cart"
						/>
					</NavLink>
				</li>
				<li className={styles.link}>
					<NavLink to="/warehouses" exact="false">
						<img
							className={styles.icon}
							src={warehoseIcon}
							alt="warehouses"
						/>
					</NavLink>
				</li>
			</ul>
			<ul className={styles.theme__container}>
				<div className={styles.theme__switcher}>
					<img
						onClick={() =>
							dispatchTheme(
								theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
							)
						}
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
