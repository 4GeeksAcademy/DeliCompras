import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const SelectSucursal = () => {
    const { store, actions } = useContext(Context);
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        store.auth ? actions.getSucursales(localStorage.getItem("token")) : null;
    }, []);

    function toggleBorder (index) {
        setIsActive(index === isActive ? null : index);
        actions.setSelectSucursale(index === isActive ? null : index)
    };

    const crear = async() => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();

        const order = {
            id: "",
            day_Date : dia,
            month_Date: mes,
            year_Date: anio,
            id_Restaurant: parseInt(localStorage.getItem("id")),
            id_Sucursale: store.selectSucursale
        }

        const id = await actions.postOrder(order);

        for (const element of store.carrito) {
            element.id_Order = id;
            console.log(element);
            await actions.addOrderCart(element, element.id);
        }
    };

    return (
        <>
        <>{store.selectSucursale}</>
        {store.auth == false ? <Navigate to="/"/> :
        <div className="container">
            <div> Selecciona el destino de tu orden </div>
            <ul>
            {store.sucursales.map((item) => (
                <li key={item.id} className={`${item.id === isActive ? 'divBorder' : ''}`} onClick={() => toggleBorder(item.id)}>
                <b>  {item.id} {item.name} {item.direccion}  </b>
                </li>
            ))}
            </ul>

            <Link to="/resumen">
                <button>Volver a Resumen</button>
            </Link>
            <Link to="/">
                <button onClick={crear}>Confirmar Orden</button>
            </Link>
        </div>
        }
        </>
    );
}