import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
	return (
		<>
			<div className={styles.container}>
				<ul className={styles.list__container}>
					<li>
						<NavLink to="/" exact="true">
							Home
						</NavLink>
					</li>
                    <li>
						<NavLink to="/cart" exact="true">
							Cart
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Sidebar;
