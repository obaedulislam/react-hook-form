import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import SignUp from "./components/auth/SignUp";
import Products from "./components/products/Products";
import AddProducts from "./components/products/AddProducts";

function App() {
	return (
		<MantineProvider>
			{/* <SignUp></SignUp> */}

			<Products></Products>
		</MantineProvider>
	);
}

export default App;
