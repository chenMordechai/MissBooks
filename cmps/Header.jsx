import { UserMsg  } from "./UserMsg.jsx";


const { NavLink } = ReactRouterDOM

export function Header(){
    return <header className="app-header">
            <h1>My App</h1>
            <nav className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>
            <UserMsg/>
        </header>
}