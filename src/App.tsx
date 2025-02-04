import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import SignUp from "./components/auth/SignUp";

function App() {
	return (
		<MantineProvider>
			<SignUp></SignUp>
		</MantineProvider>
	);
}

export default App;
