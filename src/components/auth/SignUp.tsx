import {
  Button,
  Checkbox,
  Group,
  Input,
  PasswordInput,
  Radio,
  Select,
} from "@mantine/core";
import BoxLayout from "../layout/BoxLayout";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useRef } from "react";

function SignUp() {
  // schema declaration with yup resolver
  const signUpSchema = yup.object({
    firstName: yup
      .string()
      .required(({ label }) => `${label} is required`)
      .label("First name"),
    lastName: yup.string().required().label("Last Name"),
    designation: yup
      .number()
      .required("You need select designation")
      .label("Designation"),
    email: yup.string().required().label("Email"),
    age: yup.number().typeError("Please enter correct format age").required(),
    password: yup
      .string()
      .required("You need to add a password")
      .min(8, "Password must have at least 8 characters")
      .label("Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),

    gender: yup.number().required().label("Gender"),
    skills: yup.array().min(1, "At least one skill is required").required(),
  });

  type SignUpSchemaType = yup.InferType<typeof signUpSchema>;

  // react hook form state manage

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: SignUpSchemaType) => console.log(data);

  return (
    <BoxLayout>
      <form
        action=""
        className="border border-cyan-400 p-5 max-w-[550px] rounded-md mx-auto my-24 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-5">
          <Input.Wrapper
            label="First name"
            error={
              <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-2">{message}</p>
                )}
              />
            }
          >
            <Input
              placeholder="Enter your first name"
              {...register("firstName")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="Last name"
            error={
              <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => (
                  <p className="text-red-500 text-xs mt-2">{message}</p>
                )}
              />
            }
          >
            <Input
              placeholder="Enter your last name"
              {...register("lastName")}
            />
          </Input.Wrapper>
        </div>
        <Input.Wrapper
          label="Designation"
          error={<ErrorMessage errors={errors} name="designation" />}
        >
          <select
            className="border border-red-200 ml-2"
            {...register("designation")}
          >
            <option value="">Select a designation</option>
            <option value="1">Front-end dev</option>
            <option value="2">Back-end dev</option>
            <option value="3">Full-Stack dev</option>
          </select>
        </Input.Wrapper>

        <Input.Wrapper
          label="Email"
          error={<ErrorMessage errors={errors} name="email" />}
        >
          <Input placeholder="Your email" {...register("email")} />
        </Input.Wrapper>
        <Input.Wrapper
          label="Age"
          error={<ErrorMessage errors={errors} name="age" />}
        >
          <Input placeholder="" {...register("age")} />
        </Input.Wrapper>
        <Input.Wrapper
          label="Password"
          error={<ErrorMessage errors={errors} name="password" />}
        >
          <PasswordInput placeholder="Password" {...register("password")} />
        </Input.Wrapper>
        <Input.Wrapper
          label="Confirm Password"
          error={<ErrorMessage errors={errors} name="confirmPassword" />}
        >
          <PasswordInput
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
        </Input.Wrapper>
        <Input.Wrapper error={<ErrorMessage errors={errors} name="gender" />}>
          <Radio.Group name="favoriteFramework" label="Gender">
            <Group mt="xs">
              <Radio value="1" label="Male" {...register("gender")} />
              <Radio value="2" label="Female" {...register("gender")} />
              <Radio value="3" label="Others" {...register("gender")} />
            </Group>
          </Radio.Group>
        </Input.Wrapper>
        <Input.Wrapper
          label="Skills"
          error={<ErrorMessage errors={errors} name="skills" />}
        >
          <Group>
            <Checkbox value="1" label="React" {...register("skills")} />
            <Checkbox value="2" label="Angular" {...register("skills")} />
            <Checkbox value="3" label="Vue" {...register("skills")} />
            <Checkbox value="4" label="Remix" {...register("skills")} />
          </Group>
        </Input.Wrapper>
        <Button type="submit"> Sign Up </Button>
      </form>
    </BoxLayout>
  );
}

export default SignUp;
