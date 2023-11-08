import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Categorias de Alimentos</span>
				</Link>
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Carrito
					</button>
					<ul className="dropdown-menu">
						{store.carrito.map((item, index) => (
							<li key={index}><a className="dropdown-item" href="#"><b>{item.name}</b></a></li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};
