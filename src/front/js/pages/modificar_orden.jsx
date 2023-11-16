import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

export const Modificar_orden = () => {
    const { store, actions } = useContext(Context);
    const { index } = useParams();

    const [ state , setState] = useState(store.order[index].state || "");

    async function modificar () {
        const order = {
            day_Date : store.order[index].day_Date,
            month_Date: store.order[index].month_Date,
            year_Date: store.order[index].year_Date,
            state: state,
            id_Restaurant: store.order[index].id_Restaurant,
            id_Sucursale: store.order[index].id_Sucursale
        }
        await actions.putOrder(order, store.order[index].id);
        await actions.getAllOrder(localStorage.getItem("token"));
    }

    async function eliminar () {
        await actions.deleteOrder(store.order[index].id);
        await actions.getAllOrder(localStorage.getItem("token"));
    }

    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div>
                <h1>Orden</h1>
                <form>
                    <div>{store.order[index].id_Restaurant} - {store.order[index].restaurant_info.name}</div>
                    <div>{store.order[index].id_Sucursale} - {store.order[index].sucursale_info.name}</div>
                    <div>
                        <label className="form-label">Estado</label>
                        <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="Creada">Creada</option>
                            <option value="Pagada">Pagada</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="En Camino">En Camino</option>
                            <option value="Entregada">Entregada</option>
                            <option value="Finalizada">Finalizada</option>
                        </select>
                    </div>
                    <div>{store.order[index].day_Date}/{store.order[index].month_Date}/{store.order[index].year_Date}</div>
                    <Link to='/all_ordenes'>
                        <button onClick={() => modificar()}> Modificar </button>
                    </Link>
                </form>
            </div>
        }
        </>
    )
}