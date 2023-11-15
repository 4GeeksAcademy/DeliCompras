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
					<button>Registro user</button>
				</Link>

				<Link to="/crear_admin">
					<button>Registro admin</button>
				</Link>

				<Link to="/user_login">
					<button>Login user</button>
				</Link>

				<Link to="/admin_login">
					<button>Login admin</button>
				</Link>
			</div>
			<div>
				<Link to="/ordenes">
					<button> Mis Ordenes </button>
				</Link>
				<Link to="/all_ordenes">
					<button> Ordenes </button>
				</Link>
			</div>
		</div>
	);
};
