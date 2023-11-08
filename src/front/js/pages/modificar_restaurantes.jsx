import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Modificar_restaurantes = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const restaurantes = store.restaurantes.find(restaurantes => restaurantes.id == theid);
    const [name, setName] = useState(restaurantes.name || "");
    const [image, setImage] = useState(restaurantes.image || "");
    const [tipo, setTipo] = useState(restaurantes.tipo || "");
    const [contacto, setContacto] = useState(restaurantes.contacto || "");
    

    const isFormValid = name && image && tipo && contacto;

    const objeto = {
        name: name,
        image: image,
        tipo: tipo,
        contacto: contacto,
       
    };

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contacto" className="form-label">Contacto</label>
                    <input type="text" className="form-control" id="contacto" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                </div>
                
                <Link to="/restaurantes">
                    <button disabled={!isFormValid} onClick={() => actions.modificar_restaurantes(theid, objeto)}>Guardar Cambios</button>
                </Link>
                <Link to="/restaurantes">
                    <button onClick={() => actions.delete(theid)}>Delete </button>
                </Link>
            </form>
        </div>
    );
};