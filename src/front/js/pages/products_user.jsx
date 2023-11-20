import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";
import image from "../../img/image1.png"

export const Products_user = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getList();
    store.auth ? actions.getCart() : null;
  }, []);

  return (
    <div>
      <ul>
        {store.products.map((item) => (
          <li key={item.id}>

            <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
              <div className="col">
                <div className="card card-product">
                <div className="card-body">
                  <div className="text-center position-relative">
                    <div className="position-absolute top-0 start-0">
                      <span className="badge bg-danger">Sale</span>
                    </div>
                    <a href="#!"><img src={item.url_img} alt="img product" className="mb-3 img-fluid"/></a>

                    <div className="card-product-action">
                      <a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
                      <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View" data-bs-original-title="Quick View"></i>
                      </a>
                      <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Wishlist" data-bs-original-title="Wishlist"><i className="bi bi-heart"></i></a>
                      <a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare" data-bs-original-title="Compare"><i className="bi bi-arrow-left-right"></i></a>
                    </div>
                  </div>
                  <div className="text-small mb-1">
                    <a href="#!" className="text-decoration-none text-muted"><small>{item.category_info.name}</small></a>
                  </div>
                  <h2 className="fs-6"><a href="./pages/shop-single.html" className="text-inherit text-decoration-none">{item.name}</a></h2>
                  <div>
                    <small className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </small>
                    <span className="text-muted small">4.5(149)</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span className="text-dark">{item.price - 1}</span>
                      <span className="text-decoration-line-through text-muted">{item.price}</span>
                    </div>
                    <div>
                      {!store.auth ? null :
                        <button onClick={() => actions.postCart(1,item.id, localStorage.getItem("id"))} className="btn btn-success btn-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <b>Agregar</b>
                        </button>
                      }
                    </div>
                  </div>
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
