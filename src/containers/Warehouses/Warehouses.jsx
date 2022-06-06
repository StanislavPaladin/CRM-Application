import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWarehouse, removeWarehouse } from "@store/actions";
import { warehouseSelector } from "@store/constants/selectors";
import WarehousesList from "@components/Warehouses/WarehousesList/WarehousesList";
import RemoveItemModal from "@components/Modals/RemoveItemModal";
import AddNewItemModal from "@components/Modals/AddNewItemModal/AddNewItemModal";

import styles from "./Warehouses.module.css";

const Warehouses = () => {
	// modal add warehouse
	const [showModal, setShowModal] = useState(false);
	// new warehouse
	const [newWarehouse, setNewWarehouse] = useState(null);
	// remove warehouse
	const [warehouseToRemove, setWarehouseToRemove] = useState(null);
	const [warehouseToDelete, setWarehouseToDelete] = useState(null);
	// delete warehouse modal
	const [requestDeleteModal, setRequestDeleteModal] = useState(false);

	// set active warehouse to open profile
	const [warehouseActive, setWarehouseActive] = useState(null);

	const handleDeleteItem = (item) => {
		setRequestDeleteModal(true);
	};

	const storeData = useSelector(warehouseSelector);
	const dispatch = useDispatch();

	const generateId = () => {
		return Math.floor(Math.random() * 10000);
	};

	const [warehousesList, setWarehousesList] = useState([]);

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
			setWarehousesList(res);
		} else {
			setWarehousesList(null);
		}
	}, [storeData]);

	useEffect(() => {
		setShowModal(false);
		console.log('newWarehouse', newWarehouse);
		newWarehouse && createNewWarehouse(newWarehouse);
	}, [newWarehouse]);

	useEffect(() => {
		warehouseToDelete && deleteWarehouse(warehouseToRemove.id);
	}, [warehouseToDelete]);

	const createNewWarehouse = ({ itemName, itemSpace }) => {
		// console.log
		const id = generateId();
		dispatch(
			addWarehouse({
				[id]: {
					id: id,
					name: itemName,
					space: itemSpace,
					usedSpace: 0,
				},
			})
		);
	};

	const deleteWarehouse = (warehouse) => {
		dispatch(removeWarehouse(warehouse));
	};

	return (
		<div className={styles.container}>
			{showModal && (
				<AddNewItemModal
					itemsList={warehousesList}
					setShowModal={setShowModal}
					setNewItem={setNewWarehouse}
					item={"склад"}
				/>
			)}
			{requestDeleteModal && (
				<RemoveItemModal
					setRequestDeleteModal={setRequestDeleteModal}
					itemToDelete={warehouseToRemove}
					setItemToDelete={setWarehouseToDelete}
					item={"склад"}
				/>
			)}

			
				<WarehousesList
					warehousesList={warehousesList}
					setWarehouseToRemove={setWarehouseToRemove}
					setShowModal={setShowModal}
					handleDeleteItem={handleDeleteItem}
					setWarehouseActive={setWarehouseActive}
				/>
		</div>
	);
};


export default Warehouses;
