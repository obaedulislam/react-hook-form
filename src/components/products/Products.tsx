import { Table } from "@mantine/core";
import BoxLayout from "../layout/BoxLayout";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface IProductsInterface {
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
	// const elements = [
	// 	{
	// 		title: "Samsung Galaxy S20",
	// 		description: "A flagship smartphone with cutting-edge features.",
	// 		price: 999,
	// 		discountPercentage: 15,
	// 		rating: 4.8,
	// 		stock: 120,
	// 		brand: "Samsung",
	// 		category: "smartphones",
	// 	},
	// 	{
	// 		title: "Google Pixel 6",
	// 		description: "The latest Google smartphone with an amazing camera.",
	// 		price: 799,
	// 		discountPercentage: 10,
	// 		rating: 4.6,
	// 		stock: 85,
	// 		brand: "Google",
	// 		category: "smartphones",
	// 	},
	// 	{
	// 		title: "Sony WH-1000XM4",
	// 		description: "Premium wireless headphones with industry-leading noise cancellation.",
	// 		price: 349,
	// 		discountPercentage: 8,
	// 		rating: 4.9,
	// 		stock: 60,
	// 		brand: "Sony",
	// 		category: "headphones",
	// 	},
	// 	{
	// 		title: "Dell XPS 15",
	// 		description: "Powerful laptop with stunning display and performance.",
	// 		price: 1599,
	// 		discountPercentage: 12,
	// 		rating: 4.7,
	// 		stock: 40,
	// 		brand: "Dell",
	// 		category: "laptops",
	// 	},
	// 	{
	// 		title: "Nike Air Zoom Pegasus 38",
	// 		description: "Versatile running shoes with responsive cushioning.",
	// 		price: 129,
	// 		discountPercentage: 20,
	// 		rating: 4.5,
	// 		stock: 150,
	// 		brand: "Nike",
	// 		category: "shoes",
	// 	},
	// 	{
	// 		title: "Canon EOS R5",
	// 		description: "High-end mirrorless camera with 8K video recording capabilities.",
	// 		price: 3899,
	// 		discountPercentage: 5,
	// 		rating: 4.9,
	// 		stock: 25,
	// 		brand: "Canon",
	// 		category: "cameras",
	// 	},
	// ];

	// const rows = elements.map((element) => (
	// 	<Table.Tr>
	// 		<Table.Td>{element.title}</Table.Td>
	// 		<Table.Td>{element.description}</Table.Td>
	// 		<Table.Td>{element.price}</Table.Td>
	// 		<Table.Td>{element.discountPercentage}</Table.Td>
	// 		<Table.Td>{element.rating}</Table.Td>
	// 		<Table.Td>{element.stock}</Table.Td>
	// 		<Table.Td>{element.brand}</Table.Td>
	// 		<Table.Td>{element.category}</Table.Td>
	// 	</Table.Tr>
	// ));

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
						<Table.Tr>
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
