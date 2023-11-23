import React from "react";
import { Navbar_user } from "../component/navbar_admin.jsx";

export const Home_admin = () => {
    return (
       <div className="row" style={{height:"90vh"}}>
            <div className="col-3" style={{height:"100%", borderRight:" 0.5px dotted #0aad0a"}}>
                <Navbar_user/>
            </div>
            <div className="col-9">
                null
            </div>
       </div>
    )
}