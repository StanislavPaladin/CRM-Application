import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { warehouseSelector } from "@store/constants/selectors";

import styles from "./WarehousePage.module.css";

const Warehouse = () => {
	const storeData = useSelector(warehouseSelector);
	const id = useParams().id;
	const navigate = useNavigate();
	const warehouse = storeData[id];
	console.log('warehouse', warehouse)
	const handleGoBack = (e) => {
		e.preventDefault();
		navigate(-1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.link}>
				<Button onClick={handleGoBack} variant="outlined">
					{"<"} Назад
				</Button>
			</div>
			<div className={styles.warehouse}>
				<div className={styles.warehouse__info}>
					<h1 className={styles.info__name}>
						Склад "{warehouse.name}"
					</h1>
					<div className={styles.info__space_total}>
						Площадь склада: {warehouse.space} кв.м.
					</div>
					<div className={styles.info__space}>
						Свободное место на складе:{" "}
						{warehouse.space - warehouse.usedSpace} кв.м.
					</div>
				</div>

				<ul className={styles.warehouse__goods}>
					Список продуктов на складе:
					<li className={styles.goods__item}>
						<div className={styles.item__name}>Продукт: Фанта</div>
						<div className={styles.item__count}>Количество: 50</div>
					</li>
					<li className={styles.goods__item}>
						<div className={styles.item__name}>Продукт: Фанта</div>
						<div className={styles.item__count}>Количество: 50</div>
					</li>
					<li className={styles.goods__item}>
						<div className={styles.item__name}>Продукт: Фанта</div>
						<div className={styles.item__count}>Количество: 50</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Warehouse;
