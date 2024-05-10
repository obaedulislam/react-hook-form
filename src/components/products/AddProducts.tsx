import { Button, Checkbox, Group, Input, PasswordInput, Radio, Select } from "@mantine/core";
import BoxLayout from "../layout/BoxLayout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useRef } from "react";

function AddProducts() {
	// schema declaration with yup resolver
	const addProductSchema = yup.object({
		title: yup
			.string()
			.required(({ label }) => `${label} is required`)
			.label("First name"),
		description: yup.string().required().label("Description"),
		price: yup.string().required("You need select designation").label("Price"),
		discountPercentage: yup.string().required().label("Discount Percentage"),
		rating: yup.number().required(),
		stock: yup.string().required().label("Stock"),
		brand: yup.string().required(),
		category: yup.number().required().label("Gender"),
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

	const onSubmit = (data: AddProductSchema) => {
		console.log(data);
	};

	return (
		<BoxLayout>
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
						error={
							<ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-500 text-xs mt-2">{message}</p>} />
						}
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
					<Input {...register("brand")} />
				</Input.Wrapper>
				<Button type="submit" color="lime">
					Add Product
				</Button>
			</form>
		</BoxLayout>
	);
}

export default AddProducts;
