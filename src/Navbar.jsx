import { NavLink } from "react-router-dom";



const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Supha hot movie api</h1>
               <NavLink to="/">Home</NavLink>
               <NavLink to="PersonGList">Genre</NavLink>
               <NavLink to="Person">Movie List</NavLink>
        </nav>
    );
}
 
export default Navbar;