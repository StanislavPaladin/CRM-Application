import PropTypes from "prop-types";
import { Button } from "@mui/material";

import styles from "./RemoveItemModal.module.css";

const RemoveItemModal = ({ itemToDelete, setRequestDeleteModal, setItemToDelete, item}) => {
	const handleClick = (type) => {
        setRequestDeleteModal(false)
        if(type) {
            setItemToDelete(itemToDelete?.id)
            console.log('deleting', itemToDelete?.id)
        }
	};
	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h1 className={styles.modal__title}>
					Вы действительно хотите удалить {item} <br />{" "}
					<span>"{itemToDelete?.name}" ?</span>
				</h1>
				<div className={styles.btn__wrapper}>
					<Button variant="contained" onClick={() => handleClick("delete", itemToDelete?.id)}>
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

RemoveItemModal.propTypes = {
	itemToRemove: PropTypes.object,
    setRequestDeleteModal: PropTypes.func,
    setItemToDelete: PropTypes.func
};

export default RemoveItemModal;
