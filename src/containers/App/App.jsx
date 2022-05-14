import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "@routes/routesConfig";
import Sidebar from "@components/Sidebar";
import styles from "./App.module.css";

const App = () => {
	return (
		<div className={styles.container}>
			<BrowserRouter>
				<Sidebar />
				<Routes>
					{routesConfig.map((route, index) => (
						<Route
							path={route.path}
							key={index}
							element={route.element}
							exact={route.exact}
						/>
					))}
				</Routes>
			</BrowserRouter>
		</div>
	);
};

App.propTypes = {
	propName: PropTypes.string,
};

export default App;
