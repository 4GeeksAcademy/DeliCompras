import React from "react";
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
                    <div className="py-10 px-8 rounded" style={{
                        height: "200px",
                        backgroundImage: `url(${pan})`,
                        backgroundSize: "cover", 
                        backgroundPosition: "center",
                        padding: "48px 28px"
                    }}>
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
    )
}