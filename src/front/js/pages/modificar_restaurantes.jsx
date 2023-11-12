import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_restaurantes = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const restaurantes = store.restaurants.find(restaurantes => restaurantes.id == theid);
    const [name, setName] = useState( restaurantes.name || "");
    const [image, setImage] =useState(restaurantes.url_img || "");
    const [idu_img, setIdu] = useState(restaurantes.idu_img || "");
    const [tipo, setTipo] = useState(restaurantes.type || "");
    const [description, setDescription] = useState(restaurantes.description || "");
    const [name_contact, setNameContacto] = useState(restaurantes.name_contact || "");
    const [num_contact, setNumContacto] = useState(restaurantes.num_contact || "");
    const [file, setFile] = useState("");

    const isFormValid = name && image && tipo && name_contact && num_contact;

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
                description: description,
                url_img: url_img,
                idu_img: idu_img,
                name_contact: name_contact,
                num_contact: num_contact
            };
            await actions.putRestaurants(theid, objeto);
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
                        <label htmlFor="description" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name_contact" className="form-label">Nombre de Contacto</label>
                        <input type="text" className="form-control" id="name_contact" value={name_contact} onChange={(e) => setNameContacto(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contact" className="form-label">Numero de Contacto</label>
                        <input type="text" className="form-control" id="num_contact" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <Link to="/restaurantes">
                        <button disabled={!isFormValid} onClick={guardar}>Guardar Cambios</button>
                    </Link>
                    <Link to="/restaurantes">
                        <button onClick={() => actions.deleteRestaurants(theid)}>Delete </button>
                    </Link>
                </form>
            </div>
        }
        </>
    );
};
