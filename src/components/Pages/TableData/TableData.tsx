import { Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import BoxLayout from "../../layout/BoxLayout";
import { array } from "prop-types";

const baseURL = "https://dummyjson.com/users";

interface IUserInterface {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: string[]; 
}


function TableData(){
 
        const [users, setUsers] = useState<IUserInterface[]>([]);

        useEffect(() => {
                axios.get(baseURL).then((response) => {
                    setUsers(response.data.users);
                });
            }, []);

    return (
        <BoxLayout>
            <Table  className="table-fixed">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>First Name</Table.Th>
                        <Table.Th>Last Name</Table.Th>
                        <Table.Th>Gender</Table.Th>
                        <Table.Th>Picture</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map(user => (
                        <Table.Tr key={user.id}>
                            <Table.Td>{user.firstName}</Table.Td>
                            <Table.Td>{user.lastName}</Table.Td>
                            <Table.Td>{user.gender}</Table.Td>
                            <Table.Td><img className="w-[100px]" src={user.image} alt="User" /></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
                <Table.Caption>Scroll page to see sticky thead</Table.Caption>
            </Table>

        </BoxLayout>
    );
            
};

export default TableData;