import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div>
			<div className="d-flex justify-content-evenly align-items-center" style={{height:'100'}}>
				<div>
					<h1>ADMIN</h1>
					<Link to="/crear_admin">
						<button>Registro admin</button>
					</Link>

					<Link to="/admin_login">
						<button>Login admin</button>
					</Link>

					<Link to="/products">
						<button>productos</button>
					</Link>

					<Link to="/categorias">
						<button>categorias</button>
					</Link>

					<Link to="/restaurantes">
						<button>restaurantes</button>
					</Link>

					<Link to="/all_ordenes">
						<button> Ordenes </button>
					</Link>
				</div>
				<div>
					<h1>USER</h1>
					<Link to="/user_registration">
						<button>Registro user</button>
					</Link>

					<Link to="/user_login">
						<button>Login user</button>
					</Link>

					<Link to="/products_user">
						<button>productos usuario</button>
					</Link>

					<Link to="/categorias_user">
						<button>categorias</button>
					</Link>

					<Link to="/sucursales">
						<button>Sucursales</button>
					</Link>

					<Link to="/ordenes">
						<button> Mis Ordenes </button>
					</Link>
				</div>
			</div>



			<section className="mb-lg-10 mt-lg-14 my-8">
				<div className="container">
					<div className="row">
						<div className="col-12 mb-6">
							<h3 className="mb-0">Featured Categories</h3>
						</div>
					</div>
					<div className="category-slider slick-initialized slick-slider"><span className="slick-prev slick-arrow"><i className="feather-icon icon-chevron-left"></i></span>
						
						<div className="slick-list draggable">
							<div className="slick-track" style={{opacity:' 1', width:' 4224', transform: 'translate3d(-1408px, 0px, 0px)', transition: 'transform 500ms ease 0s'}}>
								<div className="item slick-slide" style={{width: "160"}} tabIndex="-1" data-slick-index="1" aria-hidden="true">
									<a href="../pages/shop-grid.html" className="text-decoration-none text-inherit" tabIndex="-1">
										<div className="card card-product mb-lg-4">
											<div className="card-body text-center py-8">
												<img src={""} alt="Grocery Ecommerce Template" className="mb-3"/>
										
												<div className="text-truncate">Snack &amp; Munchies</div>
											</div>
										</div>
									</a>
								</div>
							</div>
						</div>
						<span className="slick-next slick-arrow"><i className="feather-icon icon-chevron-right"></i></span>
					</div>
				</div>
			</section>



			<div className="container">
               <div className="row">
                  <div className="col-12 col-md-6 mb-3 mb-lg-0">
                     <div>
                        <div className="py-10 px-8 rounded" style={{background: 'gray'}}>
                           <div>
                              <h3 className="fw-bold mb-1">Fruits &amp; Vegetables</h3>
                              <p className="mb-4">
                                 Get Upto
                                 <span className="fw-bold">30%</span>
                                 Off
                              </p>
                              <a href="#!" className="btn btn-dark">Shop Now</a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-12 col-md-6">
                     <div>
                        <div className="py-10 px-8 rounded" style={{background: 'yellow'}}>
                           <div>
                              <h3 className="fw-bold mb-1">Freshly Baked Buns</h3>
                              <p className="mb-4">
                                 Get Upto
                                 <span className="fw-bold">25%</span>
                                 Off
                              </p>
                              <a href="#!" className="btn btn-dark">Shop Now</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

			<div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
				<div className="col">
					<div className="card card-product">
					<div className="card-body">
						<div className="text-center position-relative">
							<div className="position-absolute top-0 start-0">
								<span className="badge bg-danger">Sale</span>
							</div>
							<a href="#!"><img src="assets/images/products/product-img-1.jpg" alt="Grocery Ecommerce Template" className="mb-3 img-fluid"/></a>

							<div className="card-product-action">
								<a href="#!" className="btn-action" data-bs-toggle="modal" data-bs-target="#quickViewModal">
								<i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View" data-bs-original-title="Quick View"></i>
								</a>
								<a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Wishlist" data-bs-original-title="Wishlist"><i className="bi bi-heart"></i></a>
								<a href="#!" className="btn-action" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Compare" data-bs-original-title="Compare"><i className="bi bi-arrow-left-right"></i></a>
							</div>
						</div>
						<div className="text-small mb-1">
							<a href="#!" className="text-decoration-none text-muted"><small>Snack &amp; Munchies</small></a>
						</div>
						<h2 className="fs-6"><a href="./pages/shop-single.html" className="text-inherit text-decoration-none">Haldiram's Sev Bhujia</a></h2>
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
								<span className="text-dark">$18</span>
								<span className="text-decoration-line-through text-muted">$24</span>
							</div>
							<div>
								<a href="#!" className="btn btn-primary btn-sm">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
								Add
								</a>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};