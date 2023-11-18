import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Crear_restaurantes = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [tipo, setTipo] = useState("");
    const [description, setDescription] = useState("");
    const [name_contact, setNameContacto] = useState("");
    const [num_contact, setNumContacto] = useState("");
    const [create , setCreate] = useState(false)

    const isFormValid = name && tipo && description && name_contact && num_contact;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const restaurant = {
                name: name,
                password: password,
                type: tipo,
                description: description,
                name_contact: name_contact,
                num_contact: num_contact
            };

            await actions.postRestaurants (restaurant);
            setCreate(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Tipo</label>
                        <select id="tipo" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option selected>Open this select menu</option>
                        <option value="Comida China">Comida China</option>
                        <option value="Asadero">Asadero</option>
                        <option value="Gourmet">Gourmet</option>
                    </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Descripcion" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="Descripcion" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name_contacto" className="form-label">Nombre de Contacto</label>
                        <input type="text" className="form-control" id="name_contacto" value={name_contact} onChange={(e) => setNameContacto(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contacto" className="form-label">Numeero de Contacto</label>
                        <input type="text" className="form-control" id="num_contacto" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                    {create ? <Navigate to='/' /> : null}
                </form>
            </div>
        </div>
    );
};