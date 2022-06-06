import HomePage from "@containers/HomePage"
import Products from "@containers/Products"
import Warehouses from "@containers/Warehouses";
import Warehouse from "@components/Warehouses/WarehousePage";
import ProductPage from "@components/Products/ProductPage"

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
		path: "/products/:id",
		exact: false,
		element: <ProductPage/>
	},
	{
		path: "/warehouses",
		exact: false,
		element: <Warehouses />,
	},
	{
		path: "/warehouses/:id",
		exact: false,
		element: <Warehouse/>
	}
]

export default routesConfig;