import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Carrito = () => {
    const {store,actions} = useContext(Context) 

    return(
        <ul>
            {store.carrito.map((item, index) => (
            <li key={index}>
                <a className="dropdown-item" href="#">
                    <img width="50" src={item.product_info.url_img} alt="Img" />
                    {item.product_info.name}
                    {item.product_info.price}
                    <div>
                        <button onClick={() => aumentar(item)}>+</button>
                            {item.amount}
                        <button onClick={() => disminuir(item)}>-</button>
                    </div>
                    <button onClick={async () => {await actions.deleteCart(item.id);await actions.getCart}}>eliminar</button>
                </a>
            </li>
            ))}
            <Link to="/select_sucursal">
                <button disabled={store.carrito.length > 0 ? false : true}> Continuar </button>
            </Link>
        </ul>
    )
}