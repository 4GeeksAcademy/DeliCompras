import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crear_restaurantes = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [tipo, setTipo] = useState("");
    const [contacto, setContacto] = useState("");

    const isIdUnique = !(store.restaurantes.some(restaurantes => restaurantes.id == id))
    const isFormValid = name && image && tipo && contacto && isIdUnique && id;
    

    const objeto = {
        id : id,
        name: name,
        image: image,
        tipo: tipo,
        contacto: contacto,
       
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
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contacto" className="form-label">Contacto</label>
                    <input type="text" className="form-control" id="contacto" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                
                <Link to="/restaurantes">
                    <button disabled={!isFormValid} onClick={() => actions.crear_restaurantes(objeto)}>Guardar Cambios</button>
                </Link>
                </form>
                </div>
            </div>
            
        </div>
    );
};
