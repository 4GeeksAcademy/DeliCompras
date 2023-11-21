import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Carousel } from "../component/carrusel.jsx";
import { Prom } from "../component/prom.jsx";
import { Products_user } from "./products_user.jsx"
import { Seccion } from "../component/seccion.jsx";
import { Slide } from "../component/slide.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div>
			<div className="d-flex justify-content-evenly align-items-center" style={{height:'100'}}>
				<div>
					<h1>ADMIN</h1>
					<Link to="/crear_admin">
						<button>Registro admin</button>
					</Link>

					<Link to="/admin_login">
						<button>Login admin</button>
					</Link>

					<Link to="/products">
						<button>productos</button>
					</Link>

					<Link to="/categorias">
						<button>categorias</button>
					</Link>

					<Link to="/restaurantes">
						<button>restaurantes</button>
					</Link>

					<Link to="/all_ordenes">
						<button> Ordenes </button>
					</Link>
				</div>
				<div>
					<h1>USER</h1>
					<Link to="/user_registration">
						<button>Registro user</button>
					</Link>

					<Link to="/user_login">
						<button>Login user</button>
					</Link>

					<Link to="/products_user">
						<button>productos usuario</button>
					</Link>

					<Link to="/categorias_user">
						<button>categorias</button>
					</Link>

					<Link to="/sucursales">
						<button>Sucursales</button>
					</Link>

					<Link to="/ordenes">
						<button> Mis Ordenes </button>
					</Link>
				</div>
			</div>

			
			<Slide/>
			<Carousel/>
			<Prom/>
			<Products_user/>
			<Seccion/>
		</div>
	);
};