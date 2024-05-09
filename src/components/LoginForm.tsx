import { useForm } from "react-hook-form";
import { Input } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { Button } from "@mantine/core";

function LoginForm() {
	// register allow us to input individual inputs into the hooks
	// we use handlesubmit function to retrieve the value of form
	// if we deliver default value then it checks type behind the scene on behalf of us
	// watch api will return the value of the value that are typing in the input field
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	console.log(errors);
	console.log(watch("email"));
	console.log(watch("password"));

	// login form
	return (
		/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
		>
			{/* register your input into the hook by invoking the "register" function */}
			{/* <input defaultValue="test" {...register("example")} /> */}
			<Input.Wrapper label="Email" error={errors.email?.message}>
				<Input {...register("email", { required: "Email is required" })} placeholder="Please enter your email" />
			</Input.Wrapper>
			{/* include validation with required or other standard HTML validation rules */}
			{/* <input {...register("exampleRequired", { required: true })} /> */}
			{/* errors will return when field validation fails  */}
			<PasswordInput
				{...register("password", {
					required: "Password is required",
					minLength: {
						value: 4,
						message: "Min length should be at least 4 characters",
					},
				})}
				label="Password"
				placeholder="***************"
				error={errors.password?.message}
			/>
			<Button variant="filled" color="violet" type="submit" mt="md">
				Button
			</Button>
			;
		</form>
	);
}

export default LoginForm;
