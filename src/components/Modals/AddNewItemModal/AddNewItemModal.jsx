import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import styles from "./AddNewItemModal.module.css";

const AddNewItemModal = ({ setShowModal, setNewItem, itemsList, item }) => {
	// common states for warehouses and products
	const [itemName, setItemName] = useState("");
	const [itemSpace, setItemSpace] = useState("");
	const [errors, setErrors] = useState({ name: "", space: "", exist: null });
	const [passedValidate, setPassedValidate] = useState(false);

	// products special states
	const [itemImage, setItemImage] = useState("");
	const [spreadProducts, setSpreadProducts] = useState(false); //if user wants to spread products by warehouses which have a free space (checkbox)

	useEffect(() => {
		if (!errors.name && !errors.space && itemName && itemSpace) {
			setPassedValidate(true);
		} else {
			setPassedValidate(false);
		}
	}, [itemName, itemSpace]);

	const handleChange = (field) => {
		field.name === "name" && setItemName(field.value);
		if (field.name === "space") {
			field.value < 0 && setItemSpace(0);
			field.value >= 0 && setItemSpace(field.value);
		}
		field.value.length
			? setErrors({ ...errors, [field.name]: null })
			: setErrors({
					...errors,
					[field.name]: "Поле не может быть пустым",
			  });
	};

	const requestToCreateItem = (e) => {
		e.preventDefault();
		const itemAlreadyExist = itemsList?.find(
			(item) =>
				item.name?.toLocaleLowerCase() === itemName.toLocaleLowerCase()
		);
		if (itemAlreadyExist) {
			setErrors({
				...errors,
				["exist"]: `${item} с таким названием уже существует`,
			});
			return;
		}
		itemName &&
			itemSpace &&
			setNewItem({ itemName, itemSpace, itemImage, spreadProducts });
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<button
					className={styles.close}
					onClick={() => setShowModal(false)}
				>
					x
				</button>
				{item === "склад" && (
					<WarehouseForm
						handleChange={handleChange}
						errors={errors}
						itemName={itemName}
						itemSpace={itemSpace}
						passedValidate={passedValidate}
						requestToCreateItem={requestToCreateItem}
					/>
				)}
				{item === "продукт" && (
					<ProductFrom
						
						handleChange={handleChange}
						errors={errors}
						itemName={itemName}
						itemSpace={itemSpace}
						itemImage={itemImage}
						setItemImage={setItemImage}
						spreadProducts={spreadProducts}
						setSpreadProducts={setSpreadProducts}
						passedValidate={passedValidate}
						requestToCreateItem={requestToCreateItem}
					/>
				)}
			</div>
		</div>
	);
};

AddNewItemModal.propTypes = {
	setShowModal: PropTypes.func,
	setNewItem: PropTypes.func,
};

export default AddNewItemModal;

const WarehouseForm = ({
	handleChange,
	errors,
	itemName,
	itemSpace,
	passedValidate,
	requestToCreateItem,
}) => {
	return (
		<form
			onSubmit={(e) => requestToCreateItem(e)}
			className={styles.modal__content}
		>
			<div className={styles.input__wrapper}>
				<label htmlFor="name" className={styles.label}>
					Название склада*
				</label>
				<input
					onBlur={(e) => handleChange(e.target)}
					className={errors.name ? styles.inputError : styles.input}
					type="text"
					name="name"
					id="name"
					value={itemName}
					onChange={(e) => handleChange(e.target)}
				/>
				<span className={styles.error}>{errors.name}</span>
			</div>
			<div className={styles.input__wrapper}>
				<label htmlFor="space" className={styles.label}>
					Площадь склада (кв. м)*
				</label>
				<input
					onBlur={(e) => handleChange(e.target)}
					className={errors.space ? styles.inputError : styles.input}
					type="text"
					pattern="[0-9]*"
					name="space"
					id="space"
					value={itemSpace}
					onChange={(e) => handleChange(e.target)}
				/>
				<span className={styles.error}>{errors.space}</span>
			</div>
			<div className={styles.btn__wrapper}>
				<Button
					type="submit"
					tabIndex={1}
					disabled={!passedValidate}
					variant="contained"
				>
					Добавить склад +
				</Button>
				<span className={styles.error}>{errors.exist}</span>
			</div>
		</form>
	);
};

const ProductFrom = ({
	handleChange,
	errors,
	itemName,
	itemSpace,
	passedValidate,
	requestToCreateItem,
	setItemImage,
	itemImage,
	setSpreadProducts,
	spreadProducts
}) => {
	return (
		<form
			onSubmit={(e) => requestToCreateItem(e)}
			className={styles.modal__content}
		>
			<div className={styles.input__wrapper}>
				<label htmlFor="name"
				className={styles.label}
				>
					Название продукта*
				</label>
				<input
					onBlur={(e) => handleChange(e.target)}
					className={errors.name ? styles.inputError : styles.input}
					type="text"
					name="name"
					id="name"
					value={itemName}
					onChange={(e) => handleChange(e.target)}
				/>
				<span className={styles.error}>{errors.name}</span>
			</div>
			<div className={styles.input__wrapper}>
				<label htmlFor="space" className={styles.label}>
					Площадь, занимаемая продуктом*
				</label>
				<input
					onBlur={(e) => handleChange(e.target)}
					className={errors.space ? styles.inputError : styles.input}
					pattern="[0-9]*"
					type="text"
					min="0"
					name="space"
					id="space"
					value={itemSpace}
					onChange={(e) => handleChange(e.target)}
				/>
				<span className={styles.error}>{errors.space}</span>
			</div>
			<div className={styles.input__wrapper}>
				<label htmlFor="image" className={styles.label}>
					Ссылка на картинку продукта
				</label>
				<input
					className={styles.input}
					type="url"
					name="space"
					id="space"
					value={itemImage}
					onChange={(e) => setItemImage(e.target.value)}
				/>
				<span className={styles.error}></span>
			</div>
			<div className={styles.checkbox__wrapper}>
				<label htmlFor="spread" className={styles.small__label}>
					Распределить товар по свободным складам автоматически?
				</label>
				<input
					className={styles.checkbox}
					type="checkbox"
					checked={spreadProducts}
					name="spread"
					id="space"
					value={itemImage}
					onChange={(e) => setSpreadProducts(!spreadProducts)}
				/>
				<span className={styles.error}></span>
			</div>
			<div className={styles.btn__wrapper}>
				<Button
					type="submit"
					tabIndex={1}
					disabled={!passedValidate}
					variant="contained"
				>
					Добавить продукт +
				</Button>
				<span className={styles.error}>{errors.exist}</span>
			</div>
		</form>
	);
};
