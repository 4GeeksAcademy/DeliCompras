import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_sucursales = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const sucursales = store.sucursales.find(sucursal => sucursal.id == theid);
    const [name, setName] = useState( sucursales.name || "");
    const [image, setImage] =useState(sucursales.url_img || "");
    const [idu_img, setIdu] = useState(sucursales.idu_img || "");
    const [tipo, setTipo] = useState(sucursales.type || "");
    const [address, setAddress] = useState(sucursales.address || "");
    const [name_contact, setNameContacto] = useState(sucursales.name_contact || "");
    const [num_contact, setNumContacto] = useState(sucursales.num_contact || "");
    const [file, setFile] = useState(null);
    console.log(sucursales)
    const isFormValid = name && address && tipo;

    const guardar = async (e) => {
        e.preventDefault();
        try {
            let url_img;
            if (file) {
                const temp = await actions.upload_img(file);
                url_img = temp[0];
                setIdu(temp[1])
            }else url_img = image

            const objeto = {
                name: name,
                type: tipo,
                address: address,
                url_img: url_img,
                idu_img: idu_img,
                name_contact: name_contact,
                num_contact: num_contact
            };
            await actions.putSucursales(theid, objeto);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { store.auth == false ? <Navigate to="/"/> :
            <div>
                <form>
                    <img width="100" src={file ? URL.createObjectURL(file) : image} alt="Imagen Seleccionada" />

                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Imagen</label>
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
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Tipo</label>
                        <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Direccion</label>
                        <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
                        <button disabled={!isFormValid} onClick={guardar}>Guardar Cambios</button>
                    </Link>
                    <Link to="/sucursales">
                        <button onClick={() => actions.deleteSucursales(theid)}>Delete </button>
                    </Link>
                </form>
            </div>
        }
        </>
    );
};