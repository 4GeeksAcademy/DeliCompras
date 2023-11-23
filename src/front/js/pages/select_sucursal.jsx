import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const SelectSucursal = () => {
    const { store, actions } = useContext(Context);
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        store.auth ? actions.getSucursales() : null;
    }, []);

    function toggleBorder (index) {
        setIsActive(index === isActive ? null : index);
        actions.setSelectSucursale(index === isActive ? null : index)
    };

    const crear = async() => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const anio = fechaActual.getFullYear();

        const order = {
            id: "",
            day_Date : dia,
            month_Date: mes,
            year_Date: anio,
            value : store.priceOrder,
            id_Restaurant: parseInt(localStorage.getItem("id")),
            id_Sucursale: store.selectSucursale
        }

        const id = await actions.postOrder(order);

        for (const element of store.carrito) {
            element.id_Order = id;
            console.log(element);
            await actions.addOrderCart(element, element.id);
            await actions.creado();
        }
    };

    return (
        <>
    { !store.auth ? <Navigate to="/"/> :
      <div className="container" style={{marginTop:"30px"}}>
        <div>
          <h3 class="mb-0"><b>Sucursales</b></h3>
        </div>
        <ul className="row row-cols-lg-5 list-unstyled" style={{paddingTop:"30px", paddingBottom:"60px"}}>
          {store.sucursales.map((item) => (
            <div key={item.id} className={`card card-product ${item.id === isActive ? 'divBorder' : ''}`} style={{borderRadius:"8px"}} onClick={() => toggleBorder(item.id)}>
              <div className="card-body" style={{height:"343px", width:"216"}}>
                <div className="text-center position-relative">
                  <a href="#!"><img src={item.url_img} alt="img product" className="img-fluid" style={{width:"184px",height:"184px", marginBottom:"12px"}}/></a>
    
                  <div className="card-product-action">
                    <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                    <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View" data-bs-original-title="Quick View"></i>
                    </a>
                    <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Wishlist" data-bs-original-title="Wishlist"><i className="bi bi-heart"></i></a>
                    <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare" data-bs-original-title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                  </div>
                </div>
                <h2 className="fs-6" style={{mexHeight:"14px", marginBottom:"6px"}}><a href="./pages/shop-single.html" className="text-inherit text-decoration-none" style={{color:"black"}}>{item.name}</a></h2>
                <div className="text-small mb-1" style={{marginBottom:"4px"}}>
                  <a href="#!" className="text-decoration-none text-muted" style={{display:"flex",flexDirection:"column"}}><small>{item.dir}</small><small>{item.city}, {item.country}</small></a>
                </div>
              </div>
            </div>
          ))}
        </ul>
        <Link to="/ordenes">
            <button className="btn btn-success" onClick={crear}>Confirmar Orden</button>
        </Link>
      </div>
    }
    </>
    );
}