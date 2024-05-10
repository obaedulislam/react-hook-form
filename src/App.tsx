import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import SignUp from "./components/auth/SignUp";
import TableData from "./components/Pages/TableData/TableData";

function App() {
	return (
		<MantineProvider>
			{/* <SignUp></SignUp> */}
			<TableData></TableData>
			
		</MantineProvider>
	);
}

export default App;
