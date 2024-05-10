import { Table } from "@mantine/core";
import BoxLayout from "../layout/BoxLayout";

import axios from "axios";
import React, { useEffect, useState } from "react";

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
	const baseURL = "https://dummyjson.com/products";
	const [products, setElement] = useState<IProductsInterface[]>([]);

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setElement(response.data.products);

			// console.log(response.data.products);
		});
	}, []);

	return (
		<BoxLayout>
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
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</BoxLayout>
	);
}

export default Products;
