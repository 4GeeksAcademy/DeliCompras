import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Modificar_sucursales = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const sucursales = store.sucursales.find(sucursales => sucursales.id == theid);
    const [name, setName] = useState(sucursales.name || "");
    const [direccion, setDireccion] = useState(sucursales.direccion || "");
    const [tipo, setTipo] = useState(sucursales.tipo || "");
    const [contacto, setContacto] = useState(sucursales.contacto || "");
    

    const isFormValid = name && direccion && tipo && contacto;

    const objeto = {
        name: name,
        direccion: direccion,
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
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contacto" className="form-label">Contacto</label>
                    <input type="text" className="form-control" id="contacto" value={contacto} onChange={(e) => setContacto(e.target.value)} />
                </div>
                
                <Link to="/sucursales">
                    <button disabled={!isFormValid} onClick={() => actions.modificar_sucursales(theid, objeto)}>Guardar Cambios</button>
                </Link>
                <Link to="/sucursales">
                    <button onClick={() => actions.delete(theid)}>Delete </button>
                </Link>
            </form>
        </div>
    );
};