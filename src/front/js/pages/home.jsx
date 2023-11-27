import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carrusel.jsx";
import { Prom } from "../component/prom.jsx";
import { Products_user } from "./products_user.jsx"
import { Seccion } from "../component/seccion.jsx";
import { Slide } from "../component/slide.jsx";
import { Icono } from "../component/icono.jsx";
import "../../styles/home.css";

export const Home = () => {
	const {store} = useContext(Context)
	
	return (
		<div style={{overflow: "hidden"}}>	
			<Slide/>
			<Carousel/>
			<Prom/>
			<Products_user/>
			<Seccion/>
			{store.auth && store.user == "restaurant" ? 
				<Icono/>
			: null }
		</div>
	);
};