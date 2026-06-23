import styles from "./header.module.css";
import { ICONS } from "../../shared";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";

interface HeaderProps {
	onCartOpen?: (e: React.MouseEvent) => void;
}
export function Header({ onCartOpen }: HeaderProps) {
 	const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated);

    return (
        <header className={styles.header}>
			<div className={styles.headerLinks}>
				{
					<Link to="/catalog" className={styles.headerLink}>
						КАТАЛОГ
					</Link>
				}
				{
					<Link to="/about" className={styles.headerLink}>
						ПРО НАС
					</Link>
				}
				{
					<Link to="/contacts" className={styles.headerLink}>
						КОНТАКТИ
					</Link>
				}
			</div>
            <Link to="/">
                <ICONS.HeaderLogo className={styles.headerLogo} />
            </Link>

            <div className={styles.headerProfile}>
                <div 
					className={styles.headerProfileCart} 
					{...(onCartOpen ? { onClick: (e) => onCartOpen(e) } : {})}
					style={{ cursor: 'pointer' }}
				>
					<ICONS.Cart className={styles.headerProfileCartIcon} />
					<ICONS.CartOnHover
						className={styles.headerProfileCartIconHover}
					/>
				</div>
				<Link className={styles.headerProfileProfile} to={isAuthenticated ? '/profile' : '/auth/login'}>
					<ICONS.Profile
						className={styles.headerProfileProfileIcon}
					/>
					<ICONS.ProfileOnHover
						className={styles.headerProfileProfileIconHover}
					/>
				</Link>
			</div>
		</header>
	);

}
