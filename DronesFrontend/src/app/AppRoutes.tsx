import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	AboutUsPage,
	HomePage,
	LoginPage,
	NotFoundPage,
	RecoveryCodePage,
	RecoveryPage,
	RecoverySuccessPage,
	RegistrationPage,
	RegistrationSuccess,
	ContactsPage,
	ProductPage,
	CheckoutPage,
	CatalogPage
} from "../pages";

import { Layout, ModalCart } from "./layout";

import { ScrollToTop } from "./scrollToTop";
import { AuthLayout } from "./auth-layout";


export function AppRoutes() {
	return (
		<BrowserRouter>
			<ScrollToTop></ScrollToTop>
			<Routes>
				<Route path="/auth" element={<AuthLayout />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="registration" element={<RegistrationPage />} />
					<Route
						path="registration/success"
						element={<RegistrationSuccess />}
					/>
					<Route path="recovery" element={<RecoveryPage />} />
					<Route
						path="recovery/success"
						element={<RecoverySuccessPage />}
					/>
					<Route
						path="recovery/:code"
						element={<RecoveryCodePage />}
					/>
				</Route>
				<Route path="/" element={<Layout />}>
					<Route path="" element={<HomePage />} />
					<Route path="about" element={<AboutUsPage />} />
					<Route path="checkout" element={<CheckoutPage />} />
					<Route path="contacts" element={<ContactsPage />} />
					<Route path="catalog" element={<CatalogPage />} />
					<Route path="products/:id" element={<ProductPage />} />
					<Route path="*" element={<NotFoundPage/>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
