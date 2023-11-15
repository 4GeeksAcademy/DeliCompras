import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const OrdenCreada = () => {
    const {store, actions} = useContext(Context)

    return (
        <>
        { !store.auth ? <Navigate to="/products" /> :
            <div>
                <div>Orden Creada</div>
                <div>
                    <Link to="/">
                        <button> Home </button>
                    </Link>
                    <Link to="/ordenes">
                        <button> Mis Ordenes </button>
                    </Link>
                </div>
            </div>
        }
        </>
    )
}