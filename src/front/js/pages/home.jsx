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
			<Slide/>
			<Carousel/>
			<Prom/>
			<Products_user/>
			<Seccion/>
		</div>
	);
};