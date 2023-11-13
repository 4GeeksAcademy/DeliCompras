import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Map } from "../component/map.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div className="d-flex justify-content-evenly align-items-center" style={{height:100}}>
			<div>
				<Link to="/products">
					<button>productos</button>
				</Link>

				<Link to="/categorias">
					<button>categorias</button>
				</Link>
			</div>
			<div>
				<Link to="/restaurantes">
					<button>restaurantes</button>
				</Link>

				<Link to="/sucursales">
					<button>Sucursales</button>
				</Link>
			</div>
			<div>
				<Link to="/user_registration">
					<button>Registro</button>
				</Link>

				<Link to="/user_login">
					<button>Login</button>
				</Link>
			</div>
		</div>
	);
};
