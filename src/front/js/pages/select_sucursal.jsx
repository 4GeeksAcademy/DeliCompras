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
    };

    return (
        <>
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
            <button>Confirmar Orden</button>
            </Link>
        </div>
        }
        </>
    );
}