import React from "react";
import { Link } from "react-router-dom";
import frutas from "../../img/frutas.png"
import pan from "../../img/pan.png"

export const Prom = () => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 mb-3 mb-lg-0">
                    <div>
                    <div className="py-10 px-8 rounded" style={{
                        height: "200px",
                        backgroundImage: `url(${frutas})`,
                        backgroundSize: "cover", 
                        backgroundPosition: "center",
                        padding: "48px 28px"
                    }}>
                        <div>
                            <h3 className="fw-bold mb-1">Frutas &amp; Vegetales</h3>
                            <p className="mb-4">
                                Hasta
                                <span className="fw-bold"> 30% </span>
                                de descuento
                            </p>
                            <Link to="/lista_por_categorias/1">
                                <button href="#!" className="btn btn-dark">Comprar ahora</button>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div>
                    <div className="py-10 px-8 rounded" style={{
                        height: "200px",
                        backgroundImage: `url(${pan})`,
                        backgroundSize: "cover", 
                        backgroundPosition: "center",
                        padding: "48px 28px"
                    }}>
                        <div>
                            <h3 className="fw-bold mb-1">Pan Recien Horneado</h3>
                            <p className="mb-4">
                                Hasta
                                <span className="fw-bold"> 25% </span>
                                de descuento
                            </p>
                            <Link to="/lista_por_categorias/1">
                                <button href="#!" className="btn btn-dark">Comprar ahora</button>
                            </Link>                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}