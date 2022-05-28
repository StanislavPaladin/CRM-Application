import { useState } from "react";
import  Button  from "@mui/material/Button";
import styles from "./AddWarehouseModal.module.css";

const AddWarehouseModal = ({ setShowModal, setNewWarehouse }) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
	return (
		<div className={styles.overlay}>
			<div className={styles.modal} >
				<button
					className={styles.close}
					onClick={() => setShowModal(false)}
				>
					x
				</button>
				<input type="text" value={inputValue} onChange={(e) => handleChange(e)}/>
                <Button onClick={() => setNewWarehouse(inputValue)}>Добавить склад +</Button>
			</div>
		</div>
	);
};

export default AddWarehouseModal;
