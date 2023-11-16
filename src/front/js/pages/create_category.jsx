import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

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
            <div>
                <img width="100" src={image ? URL.createObjectURL(image) : null } alt="Imagen Seleccionada" />

                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Imagen</label>
                    <input
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={(e)=> {setImage(e.target.files[0])}}
                    />
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <button disabled={!isFormValid} onClick={crear}>Guardar Cambios</button>
                            {create ? <Navigate to='/categorias' /> : null}
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
};