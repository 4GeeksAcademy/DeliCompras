import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Carrito = () => {
    const {store,actions} = useContext(Context) 

    return(
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" aria-modal="true" role="dialog">
            <div className="offcanvas-header border-bottom">
                <div className="text-start">
                    <h5 id="offcanvasRightLabel" className="mb-0 fs-4">Shop Cart</h5>
                </div>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
                <div>
                    <div className="alert alert-danger p-2" role="alert">
                        Tienes envío GRATIS. ¡Empiece a 
                        <a href="#!" className="alert-link"> pagar ahora!</a>
                    </div>

                    <ul className="list-group list-group-flush">
                        {store.carrito.map((item, index) => (
                        <li className="list-group-item py-3 ps-0 border-top">
                            <div className="row align-items-center">
                                <div className="col-6 col-md-6 col-lg-7">
                                    <div className="d-flex">
                                        <img width="64px" height="64px" src={item.product_info.url_img} alt="Ecommerce" className="icon-shape icon-xxl"/>
                                        <div className="ms-3">
                                            
                                            <a href="./pages/shop-single.html" className="text-inherit">
                                                <h6 className="mb-0">{item.product_info.name}</h6>
                                            </a>
                                            <span><small className="text-muted">{item.product_info.amount}/kg</small></span>
                                            
                                            <div className="mt-2 small lh-1">
                                                <a href="#!" className="text-decoration-none text-inherit">
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
                
                            
                                <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                                    <span className="fw-bold">{(item.product_info.price-1) * 1}</span>
                                </div>
                                <div class="text-decoration-line-through text-muted small">{item.product_info.price}</div>
                            </div>
                        </li>
                        ))}
                    </ul>
                
                    <div className="d-flex justify-content-between mt-4">
                        <a href="#!" className="btn btn-primary">Continue Shopping</a>
                        <a href="#!" className="btn btn-dark">Update Cart</a>
                    </div>
                </div>
            </div>
        </div>
    )
}