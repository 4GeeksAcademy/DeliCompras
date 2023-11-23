import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Ordenes = () => {
    const { store , actions } = useContext(Context);
    console.log(store.order)

    useEffect(()=>{
        store.auth ? actions.getOrder(localStorage.getItem("token")) : null 
    },[])
    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div class="card-body" style={{padding:"3% 20%"}}>
                <h1 className="p-3">Ordenes</h1>
                { store.creado ? 
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Orden creada con éxito! </strong>Gracias por tu pedido. Estaremos procesando tu orden.
                    <button onClick={() => actions.vaciar()} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> : null }
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
                                <td style={{paddingLeft:"30px"}}>{item.id.slice(-4)}</td>
                                <td><b style={{color:"#0aad0a"}}>{item.state}</b></td>
                                <td>{item.day_Date}/{item.month_Date}/{item.year_Date}</td>
                                <td>{item.sucursale_info.name}</td>
                                <td>$ {item.value}</td>
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