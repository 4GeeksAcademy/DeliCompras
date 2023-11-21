import React from "react";
import back1 from "../../img/back1.jpg"
import back2 from "../../img/back2.jpg"

export const Slide = () => {
    return (
        <div className="container" style={{maxWidth:"85%" , paddingTop:"40px"}}>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">

                <div className="carousel-item active" style={{backgroundImage: `url(${back1})`, backgroundSize: "cover", backgroundPosition: "center" , height:"540px", justifyContent:"start", alignItems:"center", borderRadius:"12px"}}>
                    <div class="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center" style={{width:"400px", height:"320px" , marginLeft:"100px"}}>
                        <span className="badge" style={{background:"#ffc107", color:"black"}}>Opening Sale Discount 50%</span>

                        <h2 class="text-dark display-5 fw-bold mt-4">SuperMarket For Fresh Grocery</h2>
                        <p class="lead">Introduced a new model for online grocery shopping and convenient home delivery.</p>
                        <a href="#!" class="btn btn-dark mt-3" tabindex="-1">
                           Shop Now
                           <i class="feather-icon icon-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>

                <div className="carousel-item" style={{backgroundImage: `url(${back2})`, backgroundSize: "cover", backgroundPosition: "center" , height:"540px", justifyContent:"start", alignItems:"center", borderRadius:"12px"}}>
                    <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center" style={{width:"400px", height:"320px" , marginLeft:"100px"}}>
                        <span className="badge" style={{background:"#ffc107", color:"black"}}>Opening Sale Discount 50%</span>

                        <h2 className="text-dark display-5 fw-bold mt-4">SuperMarket For Fresh Grocery</h2>
                        <p className="lead">Introduced a new model for online grocery shopping and convenient home delivery.</p>
                        <a href="#!" className="btn btn-dark mt-3" tabindex="0">
                            Shop Now
                            <i className="feather-icon icon-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
    )
}