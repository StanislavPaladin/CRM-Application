import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import styles from "./WarehousesList.module.css";

const WarehousesList = ({ storeData }) => {
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
			setWarehousesList(res);
		}
	}, [storeData]);
	return (
		<ul className={styles.list__container}>
			{warehousesList.map(({ id, name }) => (
				<li key={id} className={styles.list__item}>
					<p>Наименование склада: {name}</p>
                    <p>Идентификационный номер склада: {id}</p>
				</li>
			))}
		</ul>
	);
};

WarehousesList.propTypes = {
	storeData: PropTypes.object,
};

export default WarehousesList;
