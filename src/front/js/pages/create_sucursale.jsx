import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link , Navigate } from "react-router-dom";

export const Crear_sucursales = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] =useState("");
    const [tipo, setTipo] = useState("");
    const [address, setAddress] = useState("");
    const [name_contact, setNameContacto] = useState("");
    const [num_contact, setNumContacto] = useState("");

    const isIdUnique = !(store.sucursales.some(sucursales => sucursales.id == id))
    const isFormValid = name && address && tipo && isIdUnique && id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            console.log(temp)
            const url_img = temp[0];
            const idu_img = temp[1]

            const sucursale = {
                id : id,
                name: name,
                type: tipo,
                address: address,
                url_img: url_img,
                idu_img: idu_img,
                name_contact: name_contact,
                num_contact: num_contact,
                id_Restaurant : localStorage.getItem("id")
            };
            console.log(sucursale)
            await actions.postSucursales (sucursale);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { store.auth == false ? <Navigate to="/"/> :
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                    <form>
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
                        <label htmlFor="direccion" className="form-label">direccion</label>
                        <input type="text" className="form-control" id="direccion" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name_contact" className="form-label">Nombre de Contacto</label>
                        <input type="text" className="form-control" id="name_contact" value={name_contact} onChange={(e) => setNameContacto(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contact" className="form-label">Numero de Contacto</label>
                        <input type="text" className="form-control" id="num_contact" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <Link to="/sucursales">
                        <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                    </Link>
                    </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
};
