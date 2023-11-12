import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Crear_restaurantes = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] =useState("");
    const [tipo, setTipo] = useState("");
    const [description, setDescription] = useState("");
    const [name_contact, setNameContacto] = useState("");
    const [num_contact, setNumContacto] = useState("");

    const isIdUnique = !(store.restaurants.some(restaurantes => restaurantes.id == id))
    const isFormValid = name && image && tipo && description && name_contact && num_contact && isIdUnique && id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            console.log(temp)
            const url_img = temp[0];
            const idu_img = temp[1]

            const restaurant = {
                id : id,
                name: name,
                type: tipo,
                description: description,
                url_img: url_img,
                idu_img: idu_img,
                name_contact: name_contact,
                num_contact: num_contact
            };

            await actions.postRestaurants (restaurant);
        } catch (error) {
            console.error(error)
        }
    }

    return (
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
                    
                    <Link to="/restaurantes">
                        <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
