import React from "react";
import { Link } from "react-router-dom";

export const OrdenCreada = () => {
    return (
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
    )
}