import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Crear_categorias = () => { 
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    let idu_img;

    const isIdUnique = !(store.categories.some(categories => categories.id == id))
    const isFormValid = name && image && isIdUnique && id;

    const crear = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            console.log(temp)
            const url_img = temp[0];
            idu_img = temp[1]

            const objeto = {
                id : id,
                name: name,
                idu_img: idu_img,
                url_img: url_img
            };        
            console.log("idu:",objeto.idu," url:",objeto.url)
            await actions.postCategories(objeto);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { store.auth == false ? <Navigate to="/categorias" /> :
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
                        <label htmlFor="id" className="form-label">Id</label>
                        <input type="text" className="form-control" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    {isIdUnique ? null : <p style={{"color": "red"}}>"Id ya existe"</p>}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <Link to="/categorias">
                        <button disabled={!isFormValid} onClick={crear}>Guardar Cambios</button>
                    </Link>
                    </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
};