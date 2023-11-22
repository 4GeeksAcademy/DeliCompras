import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Ordenes = () => {
    const { store , actions } = useContext(Context);

    useEffect(()=>{
        store.auth ? actions.getOrder(localStorage.getItem("token")) : null
    },[])
    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div class="card-body" style={{padding:"10%"}}>
                <div class="table-responsive" style={{borderRadius:"8px"}}>
                    <table class="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead class="bg-light">
                        <tr>
                            <th style={{paddingLeft:"30px"}}>id</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Sucursal</th>
                            <th>Valor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {store.order.map((item) => (
                                <tr>
                                <td style={{paddingLeft:"30px"}}>{item.id}</td>
                                <td>{item.state}</td>
                                <td>{item.day_Date}/{item.month_Date}/{item.year_Date}</td>
                                <td>{item.id_Sucursale}</td>
                                <td></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
        </>
        
    )
}