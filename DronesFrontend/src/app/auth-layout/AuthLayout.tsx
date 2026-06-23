import { Outlet } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { AuthMain } from "../auth-main";

export function AuthLayout() {
	return (
		<>
			<Header />
			<AuthMain>
				<Outlet />
			</AuthMain>
			<Footer />
		</>
	);
}