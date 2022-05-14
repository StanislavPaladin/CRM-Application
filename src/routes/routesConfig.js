import HomePage from "@containers/HomePage"
import Products from "@containers/Products"
import Warehouses from "@containers/Warehouses";

const routesConfig = [
    {
		path: "/",
		exact: true,
		element: <HomePage />,
	},
    {
		path: "/products",
		exact: false,
		element: <Products />,
	},
	{
		path: "/warehouses",
		exact: false,
		element: <Warehouses />,
	},
]

export default routesConfig;