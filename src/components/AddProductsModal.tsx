import React, { useEffect, useState } from "react";
import { Button, Input } from "@mantine/core";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

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

function AddProductsModal({ selectedProduct }: { selectedProduct: IProductsInterface | null }) {
	// UseEffect to populate form fields when selectedProduct changes
	useEffect(() => {
		if (selectedProduct) {
			setValue("title", selectedProduct.title);
			setValue("description", selectedProduct.description);
			setValue("price", selectedProduct.price.toString());
			setValue("discountPercentage", selectedProduct.discountPercentage.toString());
			setValue("rating", selectedProduct.rating);
			setValue("stock", selectedProduct.stock.toString());
			setValue("brand", selectedProduct.brand);
			setValue("category", selectedProduct.category);
		}
	}, [selectedProduct]);

	const baseUrl = "https://dummyjson.com/products/add";

	const [post, setPost] = useState([]);

	// schema declaration with yup resolver
	const addProductSchema = yup.object({
		title: yup
			.string()
			.required(({ label }) => `${label} is required`)
			.label("First name"),
		description: yup.string().required().label("Description"),
		price: yup.string().required().label("Price"),
		discountPercentage: yup.string().required().label("Discount Percentage"),
		rating: yup.number().typeError("Rating is required").required(),
		stock: yup.string().required().label("Stock"),
		brand: yup.string().required().label("Brand"),
		category: yup.string().required().label("Category"),
	});

	// type SignUpSchemaType = yup.InferType<typeof addProductSchema>;
	type AddProductSchema = yup.InferType<typeof addProductSchema>;

	// react hook form state manage
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		resolver: yupResolver(addProductSchema),
	});

	const onSubmit = async (data: AddProductSchema) => {
		// console.log(data);

		try {
			let response;
			if (selectedProduct) {
				// Editing an existing product
				response = await axios.put(`https://dummyjson.com/products/${selectedProduct.id}`, data);
			} else {
				// Adding a new product
				response = await axios.post(baseUrl, data);
			}

			// const response = await axios.post(baseUrl, data);
			setPost(response.data);
			// Optionally, you can clear the form fields after successful submission
			setValue("title", "");
			setValue("description", "");
			setValue("price", "");
			setValue("discountPercentage", "");
			setValue("rating", 0);
			setValue("stock", "");
			setValue("brand", "");
			setValue("category", "");

			console.log(data);
		} catch (error) {
			console.error("Error while adding product:", error);
		}
	};

	return (
		<form
			action=""
			className="border border-lime-400 p-5 max-w-[550px] rounded-md mx-auto my-24 flex flex-col gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="gap-5">
				<Input.Wrapper
					label="Title"
					error={<ErrorMessage errors={errors} name="title" render={({ message }) => <p className="text-red-500 text-xs mt-2">{message}</p>} />}
				>
					<Input {...register("title")} />
				</Input.Wrapper>
				<Input.Wrapper
					label="Description"
					error={<ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-xs mt-2">{message}</p>} />}
				>
					<Input {...register("description")} />
				</Input.Wrapper>
			</div>
			<Input.Wrapper
				label="Price"
				error={<ErrorMessage errors={errors} name="price" render={({ message }) => <p className="text-red-500 text-xs mt-2">{message}</p>} />}
			>
				<Input {...register("price")} />
			</Input.Wrapper>

			<Input.Wrapper label="Discount Percentage" error={<ErrorMessage errors={errors} name="discountPercentage" />}>
				<Input {...register("discountPercentage")} />
			</Input.Wrapper>
			<Input.Wrapper label="Rating" error={<ErrorMessage errors={errors} name="rating" />}>
				<Input placeholder="" {...register("rating")} />
			</Input.Wrapper>
			<Input.Wrapper label="Stock" error={<ErrorMessage errors={errors} name="stock" />}>
				<Input {...register("stock")} />
			</Input.Wrapper>
			<Input.Wrapper label="Brand" error={<ErrorMessage errors={errors} name="brand" />}>
				<Input {...register("brand")} />
			</Input.Wrapper>
			<Input.Wrapper label="Category" error={<ErrorMessage errors={errors} name="category" />}>
				<Input {...register("category")} />
			</Input.Wrapper>
			<Button type="submit" color="lime">
				{selectedProduct ? "Edit Product" : "Add Product"}
			</Button>
		</form>
	);
}

export default AddProductsModal;
