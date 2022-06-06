import PropTypes from "prop-types";
import cn from "classnames";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircleOutlined";

import styles from "./WarehousesList.module.css";

const WarehousesList = ({
	warehousesList,
	setShowModal,
	setWarehouseToRemove,
	handleDeleteItem,
	setWarehouseActive,
}) => {
	const requestToDelete = (item) => {
		setWarehouseToRemove(item);
		handleDeleteItem(item);
	};

	const requestToShowItemPage = (item) => {
		setWarehouseActive(item);
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
									<p className={styles.list__subheader}>
										Общая площадь склада:
										<span className={styles.list__name}>
											{" " + item.space + " кв.м."}
										</span>
									</p>
									<p className={styles.list__subheader}>
										Свободная площадь склада:
										<span className={styles.list__name}>
											{" " + item.space + " кв.м."}
										</span>
									</p>
								</div>
								<div className={styles.item__tools}>
									<Link to={`/warehouses/${item.id}`}>
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
														className={
															styles.tooltip
														}
													>
														Просмотр данных о складе
													</span>
												}
											>
												<FormatListBulletedIcon
													onClick={() =>
														requestToShowItemPage(
															item
														)
													}
												/>
											</Tooltip>
										</div>
									</Link>
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
													requestToDelete(item)
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
