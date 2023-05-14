import { NavLink, Outlet } from "react-router-dom";
import css from './Layout.module.css';

const Layout = () => {
    return (
        <div className={css.background}>
            <nav className={css.header}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/movies">Movies</NavLink>

            </nav>
            <div className={css.container}>      
                <Outlet />
            </div>
        </div>
            )
};
export default Layout;