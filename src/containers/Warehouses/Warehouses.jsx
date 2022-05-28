import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addWarehouse, removeWarehouse } from "@store/actions";
import { warehouseSelector } from "@store/constants/selectors";
import RemoveWarehouseModal from "@components/Modals/RemoveWarehouseModal/RemoveWarehouseModal";

import Button from "@mui/material/Button";
import WarehousesList from "@components/Warehouses/WarehousesList/WarehousesList";
import AddWarehouseModal from "@components/Modals/AddWarehouseModal/AddWarehouseModal";

import styles from "./Warehouses.module.css";

const Warehouses = () => {
	// modal add warehouse
	const [showModal, setShowModal] = useState(false);
	// new warehouse
	const [newWarehouse, setNewWarehouse] = useState(null);
	// remove warehouse
	const [warehouseToRemove, setWarehouseToRemove] = useState(null);
	const [deletedWarehouse, setDeletedWarehouse] = useState(null);
	// delete warehouse modal
	const [requestDeleteModal, setRequestDeleteModal] = useState(false);

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
		newWarehouse && createNewWarehouse(newWarehouse);
	}, [newWarehouse]);

	useEffect(() => {
		deletedWarehouse && deleteWarehouse(warehouseToRemove.id);
	}, [deletedWarehouse]);

	const createNewWarehouse = (newWarehouse) => {
		const id = generateId();
		dispatch(
			addWarehouse({
				[id]: {
					id: id,
					name: newWarehouse,
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
				<AddWarehouseModal
					setShowModal={setShowModal}
					setNewWarehouse={setNewWarehouse}
				/>
			)}
			{requestDeleteModal && (
				<RemoveWarehouseModal
					setRequestDeleteModal={setRequestDeleteModal}
					warehouseToRemove={warehouseToRemove}
					setDeletedWarehouse={setDeletedWarehouse}
				/>
			)}

			<WarehousesList
				warehousesList={warehousesList}
				setWarehouseToRemove={setWarehouseToRemove}
				setShowModal={setShowModal}
				storeData={storeData}
				handleDeleteItem={handleDeleteItem}
			/>
		</div>
	);
};

Warehouses.propTypes = {
	propName: PropTypes.string,
};

export default Warehouses;
