import React, { useContext, useEffect , useState} from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate, useParams } from "react-router-dom";
import estrellas from "../../img/estrellas.png"

export const Products_Categorias = () => {
  const { store, actions } = useContext(Context);
  const { id_cat } = useParams();
  const [ alertLoguin, setAlertLoguin ] = useState(false)

  useEffect(() => {
    actions.getList();
  }, []);

  function agregar (id) {
    if (store.auth && store.user == "restaurant") {
      actions.postCart(1,id, localStorage.getItem("id"));
      return;
    }

    setAlertLoguin(true)
    
  }

  return (
    <div className="container" style={{marginTop:"30px"}}> 
      <div>
          <h3 className="mb-0"><b>Productos</b></h3>
      </div>
      {alertLoguin ? 
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
          </svg>
          <strong>  Ups, parece que olvidaste iniciar sesión,</strong> Inicia sesion para continuar,
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> setAlertLoguin(false)}></button>
        </div> 
      : null }
        <ul className="row row-cols-lg-4 list-unstyled">
          {store.products.filter(producto => producto.id_category == id_cat).map((item) => (
            <li key={item.id} className="col" style={{marginTop:"16px", paddingLeft:"8px", paddingRight:"8px", borderRadius:"12px"}}>
              <div className="card card-product" style={{borderRadius:"8px"}}>
                <div className="card-body" style={{height:"343px", width:"216"}}>
                  <div className="text-center position-relative">
                    <div className="position-absolute top-0 start-0">
                      <span className="badge bg-danger">Promo</span>
                    </div>
                    <a href="#!"><img src={item.url_img} alt="img product" className="img-fluid" style={{width:"184px",height:"184px", marginBottom:"12px"}}/></a>

                    <div className="card-product-action">
                      <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                      <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View" data-bs-original-title="Quick View"></i>
                      </a>
                      <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Wishlist" data-bs-original-title="Wishlist"><i className="bi bi-heart"></i></a>
                      <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare" data-bs-original-title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                    </div>
                  </div>
                  <div className="text-small mb-1" style={{height:"18px",marginBottom:"4px"}}>
                    <a href="#!" className="text-decoration-none text-muted"><small>{item.category_info.name}</small></a>
                  </div>
                  <h2 className="fs-6" style={{mexHeight:"14px", marginBottom:"6px"}}><a href="./pages/shop-single.html" className="text-inherit text-decoration-none" style={{color:"black"}}>{item.name}</a></h2>
                  <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between" ,maxHeight:"22px"}}>
                    <div style={{display:"flex" ,alignItems:"center"}}>
                      <img src={estrellas}/>
                    </div>
                    <span className="text-muted small">4.5(149)</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center" style={{maxHeight:"29.6", paddingTop:"12px"}}>
                    <div>
                      <span className="text-dark">{item.price * 0.1}$</span>
                      <span> </span>
                      <span> </span>
                      <span className="text-decoration-line-through text-muted">{item.price}$</span>
                    </div>
                    <div>
                    <button onClick={() => agregar(item.id)} className="btn btn-success btn-sm" style={{backgroundColor: "#0aad0a"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <b>Agregar</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};