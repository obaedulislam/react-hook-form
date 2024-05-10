import BoxLayout from '../layout/BoxLayout'
import { Table } from '@mantine/core'
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface tableType {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}


// const products = [
//     {
//         title: "Samsung Galaxy S20",
//         description: "A flagship smartphone with cutting-edge features.",
//         price: 999,
//         discountPercentage: 15,
//         rating: 4.8,
//         stock: 120,
//         brand: "Samsung",
//         category: "smartphones",
//     }
// ];


export default function ProductTable() {
    const baseURL = "https://dummyjson.com/products";
    const [products, setProduct] = useState<tableType[]>([])
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setProduct(response.data.products);
        });
    }, []);
    const rows = products.map((product) => (
        <Table.Tr key={product.title}>
            <Table.Td>{product.title}</Table.Td>
            <Table.Td>{product.description}</Table.Td>
            <Table.Td>{product.price}</Table.Td>
            <Table.Td>{product.discountPercentage}</Table.Td>
            <Table.Td>{product.rating}</Table.Td>
            <Table.Td>{product.stock}</Table.Td>
            <Table.Td>{product.brand}</Table.Td>
            <Table.Td>{product.category}</Table.Td>
        </Table.Tr>
    ));
    return (
        <BoxLayout>
            <h4 className='text-4xl text-cyan-500 font-semibold py-8 text-center'>Our Products</h4>
            <Table highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>description</Table.Th>
                        <Table.Th>price</Table.Th>
                        <Table.Th>discountPercentage</Table.Th>
                        <Table.Th>rating</Table.Th>
                        <Table.Th>stock</Table.Th>
                        <Table.Th>brand</Table.Th>
                        <Table.Th>category</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {/* { product?.length ? product?.map((product) => (
                        <Table.Tr key={product.title}>
                            <Table.Td>{product.title}</Table.Td>
                            <Table.Td>{product.description}</Table.Td>
                            <Table.Td>{product.price}</Table.Td>
                            <Table.Td>{product.discountPercentage}</Table.Td>
                            <Table.Td>{product.rating}</Table.Td>
                            <Table.Td>{product.stock}</Table.Td>
                            <Table.Td>{product.brand}</Table.Td>
                            <Table.Td>{product.category}</Table.Td>
                        </Table.Tr>
                    )): (
                        <Table.Tr >
                            <Table.Td colSpan={8}>No Data</Table.Td>
                        </Table.Tr>
                    )} */}
                    {rows}

                </Table.Tbody>
            </Table>
        </BoxLayout>
    )
}
