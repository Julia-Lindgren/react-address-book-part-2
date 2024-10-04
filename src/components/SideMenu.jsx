import { Link } from 'react-router-dom';

function SideMenu() {
	return (
		<>
			<nav className="sideMenu">
				<h2>Menu</h2>
				<ul>
					<li>
						<Link to="/contact">Contacts List</Link>
					</li>

					<li>
						<Link to="/contact/create">Add New Contact</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default SideMenu;