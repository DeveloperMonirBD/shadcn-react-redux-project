import { Link } from "react-router";
import logo from "../../assets/logo.svg"
import { ModeToggle } from "../mode-toggle";
export default function Navbar() {
    return (
        <nav className="max-w-7xl mx-auto h-16 flex items-center gap-3 px-5">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="font-bold ml-2">Task</span>Master
            </div>
            <Link to="/">Tasks</Link>
            <Link to="/users">Users</Link>
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </nav>
    );
}