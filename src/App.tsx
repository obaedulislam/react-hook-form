import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ProductTable from "./components/products/ProductTable";

function App() {
	return (
		<MantineProvider>
			<ProductTable></ProductTable>
		</MantineProvider>
	);
}

export default App;
