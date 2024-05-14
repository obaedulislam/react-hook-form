import {
  Button,
  Checkbox,
  Group,
  Input,
  PasswordInput,
  Radio,
  Select,
  Table,
} from "@mantine/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useRef, useState } from "react";
import BoxLayout from "../../layout/BoxLayout";
import axios from "axios";


const postUser = "https://dummyjson.com/users/add";

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

function PostData() {


    
  // schema declaration with yup resolver
  const signUpSchema = yup.object({
    firstName: yup
      .string()
      .required(({ label }) => `${label} is required`)
      .label("First name"),
    lastName: yup.string().required().label("Last Name"),
    designation: yup
      .string()
      .required("You need select designation")
      .label("Designation"),
    email: yup.string().required().label("Email"),
    age: yup.number().typeError("Please enter correct format age").required(),
    password: yup
      .string()
      .required("You need to add a password")
      .min(8, "Password must have at least 8 characters")
      .matches(/^(?=.*\d).*$/, "Password need to be at least one digit")
      .matches(
        /^((?=.*[a-z]){1}).*$/,
        " Verify if there is a lower case alphabetical character"
      )
      .matches(
        /^((?=.*[A-Z]){1}).*$/,
        "Verify if there is an upper case alphabetical character"
      )
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must contain at least one special character"
      )
      .label("Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),

    gender: yup.number().required().label("Gender"),
    skills: yup
      .array(yup.number())
      .typeError("At least two skill is required")
      .min(2, "At least two skill is required")
      .required(),
  });

  type SignUpSchemaType = yup.InferType<typeof signUpSchema>;

  // react hook form state manage

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const password = useRef({});
  password.current = watch("password", "");
  
  const newUserUrl = "https://dummyjson.com/users/add";
  
  const onSubmit = async(data: SignUpSchemaType) => {
    const fullName = data.firstName + " " + data.lastName;
    const modifiedData = { ...data, fullName };
    const { firstName, lastName, ...cleanData } = modifiedData;

    //Post Data
    try {
      const response = await axios.post(postUser, data);
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };


  const [users, setUsers] = useState<IUserInterface[]>([]);

    useEffect(() => {
            axios.get(newUserUrl).then((response) => {
                setUsers(response.data.users);
                console.log(response.data.users);
            });
        }, []);


  return (
    <BoxLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
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
              <Select
                placeholder="Select Designation"
                data={[
                  { value: "", label: "Select Designation" },
                  { value: "1", label: "Front end dev" },
                  { value: "2", label: "Back end dev" },
                  { value: "3", label: "Full stack dev" },
                ]}
                onChange={(value) => {
                  setValue("designation", value || "", {
                    shouldValidate: true,
                  });
                }}
              />
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
            <Input.Wrapper
              error={<ErrorMessage errors={errors} name="gender" />}
            >
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
            <Button type="submit" > Sign Up </Button>
          </form>
        </div>
        <div className="col-span-4">
              <Table  className="table-fixed">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>First Name</Table.Th>
                        <Table.Th>Last Name</Table.Th>
                        <Table.Th>Age</Table.Th>
                        <Table.Th>Gender</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Picture</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map(user => (
                        <Table.Tr key={user.id}>
                            <Table.Td>{user.firstName}</Table.Td>
                            <Table.Td>{user.lastName}</Table.Td>
                            <Table.Td>{user.age}</Table.Td>
                            <Table.Td>{user.gender}</Table.Td>
                            <Table.Td>{user.phone}</Table.Td>
                            <Table.Td><img className="w-[100px]" src={user.image} alt="User" /></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
                <Table.Caption>Scroll page to see sticky thead</Table.Caption>
            </Table>
        </div>
      </div>
    </BoxLayout>
  );
}

export default PostData;
