import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";


export const Carrito = () => {
    const {store,actions} = useContext(Context) 
    const [ redirect , setRedirect] = useState(false)
    const [ total , setTotal ] = useState(0)

    useEffect(() => {
        setRedirect(false)
    },[redirect])

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
        if (operacion == "sumar" || (operacion == "restar" && amount >= 0)){
            const cart = {
                amount: amount,
                id_Product : id_Product,
                id_Restaurant : id_Restaurant,
                id_Order : id_Order
            }

            actions.putCart(cart,id)
        }
    }

    if (!store.auth) {
        return (
            <div className="offcanvas offcanvas-end" style={{width:"500px"}} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" aria-modal="true" role="dialog">
                <div className="offcanvas-body" style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                    <div style={{width:"80%"}}>
                        <h1 className="mb-2">
                            Ups, parece que olvidaste iniciar sesión.
                        </h1>
                        <p style={{ textAlign: 'justify' }} className="mb-4">
                            Para agregar productos a tu carrito, necesitas estar registrado y con sesión iniciada. Inicia sesión con tu cuenta o crea una nueva para disfrutar de una experiencia de compra completa.
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
                            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56"/>
                            <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="offcanvas offcanvas-end" style={{width:"500px"}} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" aria-modal="true" role="dialog">
            <div className="offcanvas-header border-bottom">
                <div className="text-start">
                    <h5 id="offcanvasRightLabel" className="mb-0 fs-4"><b>Carrito</b></h5>
                </div>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
                <div>
                    <div className="alert alert-danger p-2" role="alert" style={{borderRadius:"8px"}}>
                        Tienes envío GRATIS. ¡Empiece a 
                        <a href="#!" className="alert-link"> pagar ahora!</a>
                    </div>

                    <ul className="list-group list-group-flush">
                        {Array.isArray(store.carrito) && store.carrito.map((item, index) => (
                            <li className="list-group-item py-3 ps-0 border-top">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <div className="d-flex">
                                            <img width="64px" height="64px" src={item.product_info.url_img} alt="Ecommerce" className="icon-shape icon-xxl"/>
                                            <div className="ms-3">
                                                
                                                <a href="./pages/shop-single.html" className="text-inherit" style={{textDecoration:"none", color:"black"}}>
                                                    <h6 className="mb-0"><b>{item.product_info.name}</b></h6>
                                                </a>
                                                <span><small className="text-muted">{item.product_info.amount}/kg</small></span>
                                                
                                                <div className="mt-2 small lh-1">
                                                    <a onClick={()=> actions.deleteCart(item.id)} className="text-decoration-none text-inherit">
                                                        <span className="me-1 align-text-bottom">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 text-success">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                            </svg>
                                                        </span>
                                                        <span className="text-muted">Remove</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    
                                    <div className="col-3 p-0">
                                        <div className="btn-group" role="group" aria-label="First group">
                                            <button type="button" className="btn btn-light" onClick={() => change("sumar", item.id, item.amount + 1, item.id_Product , item.id_Restaurant, item.id_Order)}>+</button>
                                            <div className="container d-flex align-items-center">{item.amount}</div>
                                            <button type="button" className="btn btn-light" onClick={() => change("restar", item.id, item.amount - 1, item.id_Product , item.id_Restaurant, item.id_Order)}>-</button>
                                        </div>
                                    </div>

                                    <div className="col-3" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                        <div>
                                            <span className="fw-bold">{`$ ${(item.product_info.price-1) * item.amount}`}</span> 
                                        </div>
                                        <div className="text-decoration-line-through text-muted small">{`$ ${item.product_info.price * item.amount}`}</div>
                                    </div>
                                </div>
                            </li> 
                        ))}
                            <li className="d-flex justify-content-end py-3 px-4 ps-0 border-top">
                                <div className="d-flex justify-content-around">
                                    <div className="px-3"><b>Total</b></div>
                                    <div className="px-3" style={{color:"#0aad0a"}}><b>$ {total}</b></div>
                                </div>
                            </li>
                    </ul>
                
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-primary" data-bs-dismiss="offcanvas" aria-label="Close" style={{backgroundColor:"#0aad0a", borderRadius:"8px"}} onClick={() => setRedirect(true) }><b>Continuar</b></button>
                        { redirect ? <Navigate to="/resumen" /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}