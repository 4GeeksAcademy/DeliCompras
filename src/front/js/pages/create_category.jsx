import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import default_rest from "../../img/default_rest.jpg"

export const Crear_categorias = () => { 
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [create , setCreate] = useState(false)
    let idu_img;

    const isFormValid = name && image;

    const crear = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            const url_img = temp[0];
            idu_img = temp[1]

            const objeto = {
                name: name,
                idu_img: idu_img,
                url_img: url_img
            };        

            await actions.postCategories(objeto);
            setCreate(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { !store.auth ? <Navigate to="/categorias" /> :
            <div className="card" style={{margin:"5% 25%", padding:"40px", borderRadius: "12px"}}>
                <div className="card-body">
                    <div className="pb-2"><h1>Nuevo Producto</h1></div>
                    <div className="mb-3" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img style={{width:"200px", height:"200px"}} src={image ? URL.createObjectURL(image) : default_rest } alt="Imagen Seleccionada" />

                        <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={(e)=> {setImage(e.target.files[0])}}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>     

                    <div className="pt-3" style={{display:"flex", justifyContent:"end"}}>
                        <button className="btn btn-success" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}} disabled={!isFormValid} onClick={crear}><b>Guardar Cambios</b></button>
                        {create ? <Navigate to='/categorias' /> : null}
                    </div>
                </div>
            </div>
        }
        </>
    );
};