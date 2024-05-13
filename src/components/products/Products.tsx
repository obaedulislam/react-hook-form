import { Modal, Table } from "@mantine/core";
import BoxLayout from "../layout/BoxLayout";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import AddProductsModal from "../AddProductsModal";

interface IProductsInterface {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
}

function Products() {
	// modal handling

	const [modalOpened, setModalOpened] = useState(false);

	const modalOpen = () => {
		setModalOpened(!modalOpened);
	};

	const baseURL = "https://dummyjson.com/products";
	const [products, setElement] = useState<IProductsInterface[]>([]);

	// State to store selected product data
	const [selectedProduct, setSelectedProduct] = useState<IProductsInterface | null>(null);

	// Function to handle edit click
	const handleEdit = (product: IProductsInterface) => {
		setSelectedProduct(product);

		setModalOpened(!modalOpened);
	};

	const handleDelete = (product: IProductsInterface) => {
		console.log(product.id);
	};

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setElement(response.data.products);

			// console.log(response.data.products);
		});
	}, []);

	return (
		<BoxLayout>
			<div className="flex justify-end mt-5">
				<Button className="" variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }} onClick={modalOpen}>
					Add Product
				</Button>
			</div>

			<div>
				<Modal opened={modalOpened} onClose={modalOpen} title="Add Products" centered>
					<AddProductsModal selectedProduct={selectedProduct} />
				</Modal>
			</div>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Title</Table.Th>
						<Table.Th>Description</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Discount Percentage</Table.Th>
						<Table.Th>Rating</Table.Th>
						<Table.Th>Stock</Table.Th>
						<Table.Th>Brand</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Action</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{products.map((product) => (
						<Table.Tr key={product.id}>
							<Table.Td>{product.title}</Table.Td>
							<Table.Td>{product.description}</Table.Td>
							<Table.Td>{product.price}</Table.Td>
							<Table.Td>{product.discountPercentage}</Table.Td>
							<Table.Td>{product.rating}</Table.Td>
							<Table.Td>{product.stock}</Table.Td>
							<Table.Td>{product.brand}</Table.Td>
							<Table.Td>{product.category}</Table.Td>
							<Table.Td>
								<a onClick={() => handleEdit(product)}>Edit</a>
								<br />
								<a onClick={() => handleDelete(product)}>Delete</a>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</BoxLayout>
	);
}

export default Products;
