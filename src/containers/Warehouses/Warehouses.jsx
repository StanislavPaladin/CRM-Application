import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addWarehouse, removeWarehouse } from "@store/actions";
import { warehouseSelector } from "@store/constants/selectors";

import Button from "@mui/material/Button";
import WarehousesList from "@components/Warehouses/WarehousesList/WarehousesList";
import WarehouseModal from "@components/Modals/WarehouseModal";

import styles from "./Warehouses.module.css";

const Warehouses = () => {
	const [showModal, setShowModal] = useState(false);
  
    const [newWarehouse, setNewWarehouse] = useState(null);

    const storeData = useSelector(warehouseSelector);
    const dispatch = useDispatch();

    const generateId = () => {
        return Math.floor((Math.random())*10000);
    }

    useEffect(() => {
        setShowModal(false)
        newWarehouse&&createNewWarehouse(newWarehouse);
    },[newWarehouse]);



    const createNewWarehouse = (newWarehouse) => {
			dispatch(
				addWarehouse({
					[generateId()]: {
                        id: generateId(),
						name: newWarehouse,
					},
				})
			);
            
	};

	return (
		<div className={styles.container}>
			{showModal && <WarehouseModal setShowModal={setShowModal} setNewWarehouse={setNewWarehouse}/>}
			<Button
				onClick={() => setShowModal(true)}
				variant="contained"
				sx={{
					backgroundColor: "white",
					margin: "20px",
					color: "blue",
					width: 200,
				}}
			>
				Add warehouse +
			</Button>
			<WarehousesList storeData={storeData}/>
		</div>
	);
};

Warehouses.propTypes = {
	propName: PropTypes.string,
};

export default Warehouses;
