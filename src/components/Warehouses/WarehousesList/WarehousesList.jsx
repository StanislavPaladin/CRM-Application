import PropTypes from "prop-types";
import cn from "classnames";
import Tooltip from "rc-tooltip";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircleOutlined";

import styles from "./WarehousesList.module.css";

const WarehousesList = ({
	warehousesList,
	setShowModal,
	setWarehouseToRemove,
	handleDeleteItem,
}) => {

	const handleClick = (item) => {
		setWarehouseToRemove(item);
		handleDeleteItem(item);
	};

	return (
		<div className={styles.list__wrapper}>
			<div className="">
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
					Добавить склад +
				</Button>
				{warehousesList ? (
					<ul className={styles.list__container}>
						{warehousesList.map((item) => (
							<li key={item.id} className={styles.list__item}>
								<div className={styles.item__info}>
									<p className={styles.list__subheader}>
										Наименование склада:
										<span className={styles.list__name}>
											{" " + item.name}
										</span>
									</p>
								</div>
								<div className={styles.item__tools}>
									<div
										className={cn(
											styles.tools__icon,
											styles.icon__edit
										)}
									>
										<Tooltip
											style={{ color: "transparent" }}
											placement="top"
											trigger={["hover"]}
											overlay={
												<span
													className={styles.tooltip}
												>
													Изменение данных
												</span>
											}
										>
											<EditIcon />
										</Tooltip>
									</div>
									<div
										className={cn(
											styles.tools__icon,
											styles.icon__change
										)}
									>
										<Tooltip
											style={{ color: "transparent" }}
											placement="top"
											trigger={["hover"]}
											overlay={
												<span
													className={styles.tooltip}
												>
													Переместить товары
												</span>
											}
										>
											<ChangeCircleIcon />
										</Tooltip>
									</div>
									<div
										className={cn(
											styles.tools__icon,
											styles.icon__delete
										)}
									>
										<Tooltip
											style={{ color: "transparent" }}
											placement="top"
											trigger={["hover"]}
											overlay={
												<span
													className={styles.tooltip}
												>
													Удалить склад
												</span>
											}
										>
											<DeleteForeverIcon
												onClick={() =>
													handleClick(item)
												}
											/>
										</Tooltip>
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className={styles.list__container}>Список пуст</div>
				)}
			</div>
		</div>
	);
};

WarehousesList.propTypes = {
	storeData: PropTypes.object,
};

export default WarehousesList;
