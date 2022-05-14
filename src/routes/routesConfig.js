import HomePage from "@containers/HomePage"
import Cart from "@containers/Cart"

const routesConfig = [
    {
		path: "/",
		exact: true,
		element: <HomePage />,
	},
    {
		path: "/cart",
		exact: true,
		element: <Cart />,
	},
]

export default routesConfig;