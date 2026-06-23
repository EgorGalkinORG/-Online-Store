import { Outlet } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Main } from "../main";
import { Modal } from "../../shared/ui/Modal";
import { ModalCart } from "./modalCart";
import { useState } from "react";
import { isVisible } from "@testing-library/user-event/dist/utils/misc/isVisible";
import { Notification } from "../../components/notification";
import { hideNotification } from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export function Layout() {
    const dispatch = useAppDispatch();
    const isVisible = useAppSelector((state) => state.cart.showSuccessNotification);
    const [isCartOpen, setIsCartOpen] = useState(false);
	const toggleCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsCartOpen(prev => !prev);
	};

    return (
        <>
            {isVisible && (
                <Notification 
                    message="Товар додано до кошика!" 
                    onClose={() => dispatch(hideNotification())} 
                />
            )}

			<Header onCartOpen={toggleCart} />
            <Main>
				<Outlet />
			</Main>
            <Footer />

            <Modal 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                doCloseOnClickOutside={true}
            >
                <ModalCart />
            </Modal>
        </>
    );
}
