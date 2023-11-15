import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const All_ordenes = () => {
    const { store , actions } = useContext(Context);

    useEffect(() => {
        store.auth ? actions.getAllOrder(localStorage.getItem("token")) : null
    },[])

    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <>
            <ul>
            {store.order.map((item, index) => (
                <li key={item.id}>
                    <b>{item.id},{item.state},{item.day_Date}/{item.month_Date}/{item.year_Date},{item.id_Sucursale}</b>
                    <Link to={'/modificar_orden/'+ index }>
                        <button> Modificar </button>
                    </Link>
                </li>
            ))}
            </ul>
            <Link to="/">
                <button> Home </button>
            </Link>
            </>
        }
        </>
    )
}