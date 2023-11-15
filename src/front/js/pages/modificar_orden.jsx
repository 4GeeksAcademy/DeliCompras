import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import { StorageError } from "firebase/storage";

export const Modificar_orden = () => {
    const { store, actions } = useContext(Context);
    const { index } = useParams();

    const [ rest , setRest] = useState(store.order[index].id_Restaurant || "");
    const [ sucursal , setSucursal] = useState(store.order[index].id_Sucursale || "");
    const [ state , setState] = useState(store.order[index].state || "");
    const [ day , setDay] = useState(store.order[index].day_Date || "");
    const [ month , setMonth] = useState(store.order[index].month_Date || "");
    const [ year , setYear] = useState(store.order[index].year_Date || "");

    async function modificar () {
        const order = {
            day_Date : day,
            month_Date: month,
            year_Date: year,
            state: state,
            id_Restaurant: rest,
            id_Sucursale: sucursal
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
                    <div>
                        <label htmlFor="restaurant" className="form-label">Restaurante</label>
                        <input type="text" className="form-control" id="restaurant" value={rest} onChange={(e) => setRest(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="sucursal" className="form-label">Sucursal</label>
                        <input type="text" className="form-control" id="sucursal" value={sucursal} onChange={(e) => setSucursal(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="state" className="form-label">Estado</label>
                        <input type="text" className="form-control" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="day" className="form-label">Dia</label>
                        <input type="text" className="form-control" id="restaurant" value={day} onChange={(e) => setDay(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="month" className="form-label">Mes</label>
                        <input type="text" className="form-control" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="year" className="form-label">Anio</label>
                        <input type="text" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <Link to='/all_ordenes'>
                        <button onClick={() => modificar()}> Modificar </button>
                    </Link>
                </form>
            </div>
        }
        </>
    )
}