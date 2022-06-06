import PropTypes from "prop-types";
import * as React from "react";

import cn from "classnames";
import Tooltip from "rc-tooltip";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// mui icons
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteForeverIcon from "@mui/icons-material/DeleteForeverOutlined";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircleOutlined";
// mui table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import styles from "./ProductsList.module.css";

const ProductsList = ({
	productsList,
	setShowModal,
	setProductsToRemove,
	handleDeleteItem,
	setProductsActive,
}) => {
	const spreadedSpace = 0; //mocked

	// table configuration
	const columns = [
		{
			id: "image",
			label: "Изображение ",
			minWidth: 100,
			format: (item) => (
				<img className={styles.table__image} src={item.image} alt="" />
			),
		},
		{ id: "name", label: "Наименование продукта", minWidth: 200 },
		{
			id: "freeSpace",
			label: "Нераспределённый остаток",
			minWidth: 170,
			align: "right",
		},
		{
			id: "spreadedSpace",
			label: "Распределено по складам",
			minWidth: 170,
			align: "right",
		},
		{
			id: "actions",
			label: "Действия",
			minWidth: 170,
			align: "right",
			format: (item) => {
				return (
					<div className={styles.actions__wrapper}>
						<Link to={`/products/${item?.id}`}>
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
										<span className={styles.tooltip}>
											Страница продукта
										</span>
									}
								>
									<FormatListBulletedIcon
										onClick={() =>
											requestToShowItemPage(item)
										}
									/>
								</Tooltip>
							</div>
							
						</Link>
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
													Удалить продукт
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
				);
			},
		},
		{
			id: "id",
			label: "ID",
			minWidth: 0,
			align: "right",
			format: () => null
		},
	];
	const rows = productsList
		? productsList.map((product) =>
				createTable(
					product.image,
					product.name,
					product.space,
					spreadedSpace,
					product,
					product.id
				)
		  )
		: [createTable(null, "Список пуст", null, null, null, null)];

	function createTable(image, name, freeSpace, spreadedSpace, action, id) {
		return { image, name, freeSpace, spreadedSpace, action, id };
	}

	// old state
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const requestToDelete = (item) => {
		setProductsToRemove(item);
		handleDeleteItem(item);
	};
	const requestToShowItemPage = (item) => {
		setProductsActive(item);
	};
	// endof old states

	return (
		<div className={styles.container}>
			<Button
				className={styles.btn}
				variant="contained"
				onClick={() => setShowModal(true)}
			>
				Добавить продукт +
			</Button>
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>	{column.label==="ID"? null : column.label}
										{/* {column.label} */}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.name}
										>
											{columns.map((column) => {
												const value = row[column.id];
												
												return (
													<TableCell
														className={
															styles.table__name
														}
														key={column.id}
														align={column.align}
													>
														{column.format ?
															row.id&&column.format(row) : value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
};

export const old = ({ setShowModal, productsList }) => {
	return (
		<div className={styles.container}>
			<ul className={styles.list__wrapper}>
				{productsList ? (
					productsList.map(({ id, name, space }) => (
						<li key={id}>{name}</li>
					))
				) : (
					<div>Список пуст</div>
				)}
			</ul>
		</div>
	);
};
ProductsList.propTypes = {
	propName: PropTypes.string,
};

export default ProductsList;
