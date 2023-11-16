import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getCart() : null;
  },[])

  return (
    <div class="container border-bottom">
      <header class="d-flex justify-content-center py-3 mb-4">
        <Link to="/">
          <img src="https://firebasestorage.googleapis.com/v0/b/proyect-6a0a9.appspot.com/o/img%2Fcarrito.png?alt=media&token=07182e9f-a2a2-495e-a2e0-596764c7ea1a" id="logo"/>
        </Link>
      </header>
      <header class="d-flex justify-content-between py-3">
        <ul class="nav nav-pills">
          <li class="nav-item"><a href="#" class="nav-link active" aria-current="page">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Features</a></li>
          <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
          <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
          <li class="nav-item"><a href="#" class="nav-link">About</a></li>
        </ul>
        <div className="d-flex justify-content-evenly align-items-center" id="lado">
          <div>
            {store.auth == false ? null : 
              <button className="btn btn-primary" onClick={() => actions.logout()}>Logout</button>
            }
          </div>

          <div>
            <svg data-bs-toggle="modal" data-bs-target="#exampleModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <div class="modal-header border-0">
                      <h5 class="modal-title fs-3 fw-bold" id="userModalLabel">Sign Up</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="needs-validation" novalidate="">
                      <div class="mb-3">
                        <label for="fullName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="fullName" placeholder="Enter Your Name" required=""/>
                        <div class="invalid-feedback">Please enter name.</div>
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <div class="invalid-feedback">Please enter email.</div>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter Password" required=""/>
                        <div class="invalid-feedback">Please enter password.</div>
                        <small class="form-text">
                          By Signup, you agree to our
                          <a href="#!">Terms of Service</a>
                          &amp;
                          <a href="#!">Privacy Policy</a>
                        </small>
                      </div>
                      <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>
                    <div class="border-0 justify-content-center">
                      Already have an account?
                      <a href="#">Sign in</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul>
                {store.carrito.map((item, index) => (
                  <li key={index}>
                    <a>
                      <img width="50" src={item.product_info.url_img} alt="Img" />
                      {item.product_info.name}
                      {item.product_info.price}
                      <div>
                        <button onClick={() => aumentar(item)}>+</button>
                        {item.amount}
                        <button onClick={() => disminuir(item)}>-</button>
                      </div>
                      <button onClick={async () => {await actions.deleteCart(item.id)}}>eliminar</button>
                    </a>
                  </li>
                ))}
                <Link to="/resumen">
                  <button> Resumen </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

