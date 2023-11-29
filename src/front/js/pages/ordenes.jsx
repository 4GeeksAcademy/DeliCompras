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
            <div className="card-body" style={{padding:"3% 20%"}}>
                <h1 className="p-3">Ordenes</h1>
                { store.creado ? 
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Orden creada con éxito! </strong>Gracias por tu pedido. Estaremos procesando tu orden.
                    <button onClick={() => actions.vaciar()} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div> : null }
                <div className="table-responsive" style={{borderRadius:"8px"}}>
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead className="bg-light">
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

{item.state == "Creada" ? 
                                    <td><b style={{backgroundColor:"#00da00", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}
                                {item.state == "En Proceso" ? 
                                    <td><b style={{backgroundColor:"#00da00", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}
                                {item.state                                 == "En Camino" ? 
                                    <td><b style={{backgroundColor:"#00da00", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}
                                {item.state == "Entregada" ? 
                                    <td><b style={{backgroundColor:"#00da00", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}
                                {item.state == "Finalizada" ? 
                                    <td><b style={{backgroundColor:"#7e7e7e", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}
                                {item.state == "Cancelada" ? 
                                    <td><b style={{backgroundColor:"#da4500", color:"white", fontSize:"12px", padding:"5px", borderRadius:"8px"}}>{item.state}</b></td>
                                : null}

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