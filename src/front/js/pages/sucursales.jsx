import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Sucursales = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getSucursales() : null;
  }, []);

  return (
    <>
    { !store.auth ? <Navigate to="/"/> :
      <div className="container" style={{marginTop:"30px"}}>
        <div>
          <h3 className="mb-0"><b>Sucursales</b></h3>
        </div>
        <ul className="row row-cols-lg-5 list-unstyled" style={{paddingTop:"30px", paddingBottom:"60px"}}>
          {store.sucursales.map((item) => (
            <div className="card card-product" style={{borderRadius:"8px", margin: "10px"}}>
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
                <div className="d-flex justify-content-center align-items-center" style={{maxHeight:"29.6", paddingTop:"12px"}}>
                  <Link to={`/modificar_sucursales/${item.id}`}>
                    <button className="d-flex justify-content-between btn btn-success btn-sm" style={{width:"110px", backgroundColor: "#0aad0a"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                      <b>Modificar</b>
                    </button>
                  </Link>
                
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Seguro?</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                          <div>
                            <p>Se borrara la sucursal <b>{item.name}</b> de forma permanente</p>
                          </div>
                          <div>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => actions.deleteSucursales(item.id)}><b>Borrar</b></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>

        <Link to="/crear_sucursales" style={{textDecoration:"none"}}>
          <button className="btn btn-success d-flex justify-content-around align-items-center" style={{minWidth: "145px", minHeight:"42px", borderRadius:"8px" ,backgroundColor:"#0aad0a"}}><b>Nueva Sucursal</b></button>
        </Link>
      </div>
    }
    </>
  );
};