import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crear = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const isIdUnique = !(store.categorias.some(categorias => categorias.id == id))
    const isFormValid = name && image && isIdUnique && id;
    

    const objeto = {
        id : id,
        name: name,
        image: image,
       
    };

    return (
        <div>
            <div className="card" style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
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
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                
                <Link to="/categorias">
                    <button disabled={!isFormValid} onClick={() => actions.crear(objeto)}>Guardar Cambios</button>
                </Link>
                </form>
                </div>
            </div>
            
            {/* <form>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Id</label>
                    <input type="text" className="form-control" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                {isIdUnique ? null : <p style={{"color": "red"}}>"Id ya existe"</p>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                
                <Link to="/categorias">
                    <button disabled={!isFormValid} onClick={() => actions.crear(objeto)}>Guardar Cambios</button>
                </Link>
            </form> */}
        </div>
    );
};