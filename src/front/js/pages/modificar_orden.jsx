import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const Modificar_orden = () => {
    const { store, actions } = useContext(Context);
    const { index } = useParams();

    const [ state , setState] = useState(store.order[index].state || "");

    const isFormValid = state;
    console.log(store.order[index])

    async function modificar () {
        const order = {
            day_Date : store.order[index].day_Date,
            month_Date: store.order[index].month_Date,
            year_Date: store.order[index].year_Date,
            state: state,
            id_Restaurant: store.order[index].id_Restaurant,
            id_Sucursale: store.order[index].id_Sucursale,
            value: store.order[index].value
        }
        await actions.putOrder(order, store.order[index].id);
    }

    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div className="container card" style={{margin:"5%", padding:"5%", maxWidth:"90%"}}>
                <div className="row mb-5">
                    <h1 className="col-7"><b>Orden # {store.order[index].id.slice(-4)}</b></h1>
                    <div className="col-5 row" >
                        <select className="form-select col" value={state} onChange={(e) => setState(e.target.value)} style={{height:"39px"}}>
                            <option value="Creada">Creada</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="En Camino">En Camino</option>
                            <option value="Entregada">Entregada</option>
                            <option value="Finalizada">Finalizada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                        <Link to='/all_ordenes' className="col">
                            <button disabled={!isFormValid} onClick={() => modificar()} className="btn btn-success" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a", height:"39px"}}> Modificar </button>
                        </Link>
                    </div>
                </div>
                
         
                <div className="row mb-5">
                    <div className="col">
                        <p><b>Restaurante</b></p>
                        <p className="m-0">{store.order[index].restaurant_info.name}</p>
                    </div>
                    <div className="col">
                        <p><b>Sucursal</b></p>
                        <p className="m-0">{store.order[index].sucursale_info.name}</p>
                        <p className="m-0">{store.order[index].sucursale_info.dir}</p>
                        <p className="m-0">{store.order[index].sucursale_info.city}, {store.order[index].sucursale_info.country}</p>
                        <p className="m-0">{store.order[index].sucursale_info.name_contact}</p>
                        <p className="m-0">{store.order[index].sucursale_info.num_contact}</p>
                    </div>
                    <div className="col">
                        <p><b>Fecha</b></p>
                        <p className="my-3">{store.order[index].day_Date}/{store.order[index].month_Date}/{store.order[index].year_Date}</p>
                        <p><b>Valor Total</b></p>
                        <p className="m-0">$  {store.order[index].value}</p>
                    </div>
                </div>

                <div className="table-responsive" style={{borderRadius:"8px"}}>
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead className="bg-light">
                            <tr>
                                <th style={{paddingLeft:"30px"}}>Productos</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.order[index].products.map((item , index) => (
                                <tr key={index}>
                                    <td><img className="mx-3" width="40px" height="40px" src={item.product_info.url_img}/>{item.product_info.name}</td>
                                    <td>{item.product_info.price}</td>
                                    <td>{item.product_info.amount}</td>
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