import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const All_ordenes = () => {
    const { store , actions } = useContext(Context);

    useEffect(()=>{
        actions.getAllOrder(localStorage.getItem("token"))
    },[])

    return(
        <>
            <ul>
            {store.order.map((item) => (
                <li key={item.id}>
                    <b>{item.id},{item.state},{item.day_Date}/{item.month_Date}/{item.year_Date},{item.id_Sucursale}</b>
                </li>
            ))}
            </ul>
            <Link to="/">
                <button> Home </button>
            </Link>
        </>
    )
}