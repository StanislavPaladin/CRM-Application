import PropTypes from "prop-types";
import { Button } from "@mui/material";

import styles from "./RemoveWarehouseModal.module.css";

const RemoveWarehouseModal = ({ warehouseToRemove, setRequestDeleteModal, setDeletedWarehouse}) => {
	const handleClick = (type) => {
        setRequestDeleteModal(false)
        if(type) {
            setDeletedWarehouse(warehouseToRemove?.id)
            console.log('deleting', warehouseToRemove?.id)
        }
	};
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h1 className={styles.modal__title}>
					Вы действительно хотите удалить склад <br />{" "}
					<span>"{warehouseToRemove?.name}" ?</span>
				</h1>
				<div className={styles.btn__wrapper}>
					<Button variant="contained" onClick={() => handleClick("delete", warehouseToRemove?.id)}>
						{" "}
						Да{" "}
					</Button>
					<Button variant="outlined" onClick={() => handleClick()}>
						{" "}
						Нет{" "}
					</Button>
				</div>
			</div>
		</div>
	);
};

RemoveWarehouseModal.propTypes = {
	propName: PropTypes.string,
};

export default RemoveWarehouseModal;
