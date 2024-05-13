import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Products from "./components/products/Products";

function App() {
	return (
		<MantineProvider>
			{/* <SignUp></SignUp> */}

			<Products></Products>
		</MantineProvider>
	);
}

export default App;
