import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_categorias = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const categorias = store.categories.find(categorias => categorias.id == theid);
    const [name, setName] = useState(categorias.name || "");
    const [img, setUrl] = useState(categorias.url_img || "");
    const [file, setFile] = useState(null);
    const [idu_img, setIdu] = useState(categorias.idu_img || "");
    const [create , setCreate] = useState(false)
    

    const isFormValid = name && img;

    const guardar = async (e) => {
        e.preventDefault();
        try {
            let url_img;
            if (file) {
                const temp = await actions.upload_img(file);
                url_img = temp[0];
                setIdu(temp[1])
            }else url_img = img

            const objeto = {
                name: name,
                url_img: url_img,
                idu_img: idu_img
            };

            await actions.putCategories(theid, objeto);
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
                    <img style={{width:"200px", height:"200px"}} src={file ? URL.createObjectURL(file) : img} alt="Imagen Seleccionada" />

                    <input
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={(e)=> {setFile(e.target.files[0])}}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>     

                <div className="pt-3" style={{display:"flex", justifyContent:"end"}}>
                    <button className="btn btn-success" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}} disabled={!isFormValid} onClick={guardar}><b>Guardar Cambios</b></button>
                    {create ? <Navigate to='/categorias' /> : null}
                </div>
            </div>
        </div>
        }
        </>
    );
};

