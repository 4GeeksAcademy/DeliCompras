import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/categorias">
					<span className="navbar-brand mb-0 h1">Categorias</span>
				</Link>
				<Link to="/restaurantes">
					<span className="navbar-brand mb-0 h1">Restaurantes</span>
				</Link>
				<Link to="/sucursales">
					<span className="navbar-brand mb-0 h1">Sucursales</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Home</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
