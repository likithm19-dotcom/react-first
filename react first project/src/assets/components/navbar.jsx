import {Link} from "react-router-dom";
import "../../styles/Navbar.css";
function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">Nawabs Restaurant    </div>

        <ul className="nav-links">
            <li><Link to="/">home</Link></li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/contact">contact</Link></li>
            <li><Link to="/menu">menu</Link></li>
            <li><Link to="/reservation">reservation</Link></li>
        </ul>

        
        </nav>
    );
}
export default Navbar;