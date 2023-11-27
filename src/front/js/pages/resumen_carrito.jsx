import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Resumen = () => {
    const { store, actions } = useContext(Context);

    const [ total , setTotal ] = useState(0)

    useEffect(() => {
        if (Array.isArray(store.carrito)) {
            const newTotal = store.carrito.reduce((acc, item) => {
                return acc + ((item.product_info.price - 1) * item.amount);
            }, 0);
            setTotal(newTotal);
            actions.setPriceOrder(newTotal);
        }
    }, [store.carrito]); 

    function change (operacion, id , amount, id_Product , id_Restaurant, id_Order) {
        if (operacion == "sumar" || (operacion == "restar" && amount >= 0)) {
            const cart = {
                amount: amount,
                id_Product : id_Product,
                id_Restaurant : id_Restaurant,
                id_Order : id_Order
            }

            actions.putCart(cart,id)
        }
    }

    return(
        <>
        { !store.auth ? <Navigate to="/" /> :
            <div className="card-body" style={{padding:"5% 20%"}}>
                <div className="table-responsive" style={{borderRadius:"8px"}}>
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead className="bg-light">
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Unidades</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                        {store.carrito.map((item) => (
                            <tr>
                                <td style={{paddingLeft:"30px"}}><img src={item.product_info.url_img} width="50px"/></td>
                                <td style={{alignItems:"center"}}>{item.product_info.name}</td>
                                <td style={{alignItems:"center"}}>{item.product_info.amount}/kg</td>
                                <td style={{alignItems:"center"}}>
                                    <div className="col-3 p-0">
                                        <div className="btn-group" role="group" aria-label="First group">
                                            <button type="button" className="btn btn-light" onClick={() => change("sumar", item.id, item.amount + 1, item.id_Product , item.id_Restaurant, item.id_Order)}>+</button>
                                            <div className="container d-flex align-items-center">{item.amount}</div>
                                            <button type="button" className="btn btn-light" onClick={() => change("restar", item.id, item.amount - 1, item.id_Product , item.id_Restaurant, item.id_Order)}>-</button>
                                        </div>
                                    </div>
                                </td>
                                <td style={{alignItems:"center"}}>$ {(item.product_info.price - 1) * item.amount}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end py-3 px-0">
                        <div className="d-flex justify-content-around">
                            <div className="px-3"><b>Total</b></div>
                            <div className="mx-3" style={{color:"#0aad0a", width:"120px"}}><b>$ {total}</b></div>
                        </div>
                    </div>
                    <Link className="d-flex justify-content-end" to="/select_sucursal" style={{padding:"20px", paddingBottom:"0px"}}>
                        <button type="button" className="btn btn-success" style={{backgroundColor:"#0aad0a"}}>Continuar</button>
                    </Link>
                </div>
            </div>
        }
        </>  
    )
}