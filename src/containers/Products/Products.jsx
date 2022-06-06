
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, removeProducts } from "@store/actions";
import { productsSelector } from "@store/constants/selectors";
import ProductsList from "@components/Products/ProductsList";
import AddNewItemModal from "@components/Modals/AddNewItemModal";
import RemoveItemModal from "@components/Modals/RemoveItemModal";


import styles from "./Products.module.css";


const Products = () => {
	// modal add product
	const [showModal, setShowModal] = useState(false);
	// new product
	const [newProduct, setNewProduct] = useState(null);
	// remove product
	const [productToRemove, setProductToRemove] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);
	// delete product modal
	const [requestDeleteModal, setRequestDeleteModal] = useState(false);

	// set active product to open profile
	const [productActive, setProductActive] = useState(null);

	const [productsList, setProductsList] = useState([]);

	const handleDeleteItem = () => {
		setRequestDeleteModal(true);
	};

	const dispatch = useDispatch();
	const storeData = useSelector(productsSelector);

	const generateId = () => {
		return Math.floor(Math.random() * 10000);
	};

	useEffect(() => {
		const arr = Object.entries(storeData);
		if (arr.length) {
			const res = arr.map((item) => {
				return {
					id: item[0],
					...item[1],
				};
			});
			res.sort((a, b) =>
				a.name.toString().toLowerCase() >
				b.name.toString().toLowerCase()
					? 1
					: -1
			);
			setProductsList(res);
		} else {
			setProductsList(null);
		}
	}, [storeData]);

	useEffect(() => {
		setShowModal(false);
		newProduct && createNewProduct(newProduct);
	}, [newProduct]);

	useEffect(() => {
		productToDelete && deleteProduct(productToRemove.id);
	}, [productToDelete]);

	const createNewProduct = ({ itemName, itemSpace, itemImage }) => {
		const id = generateId();
		dispatch(
			addProducts({
				[id]: {
					id: id,
					name: itemName,
					space: itemSpace,
					image: itemImage
				},
			})
		);
	};

	const deleteProduct = (product) => {
		dispatch(removeProducts(product));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.info}>
				Здесь вы можете добавлять и удалять продукты из списка. Эти
				продукты в дальнейшем можно будет распределять по складам
			</h1>
			{showModal && (
				<AddNewItemModal
					itemsList={productsList}
					setShowModal={setShowModal}
					setNewItem={setNewProduct}
					item={'продукт'}
				/>
			)}
			{requestDeleteModal && (
				<RemoveItemModal
					setRequestDeleteModal={setRequestDeleteModal}
					itemToDelete={productToRemove}
					setItemToDelete={setProductToDelete}
				/>
			)}
				<ProductsList
					productsList={productsList}
					setProductsToRemove={setProductToRemove}
					setShowModal={setShowModal}
					handleDeleteItem={handleDeleteItem}
					setProductsActive={setProductActive}
				/>
		</div>
	);
};

Products.propTypes = {
	propName: PropTypes.string,
};

export default Products;
