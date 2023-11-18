import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link , Navigate } from "react-router-dom";
import { Map } from "../component/map.jsx";

export const Crear_sucursales = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [image, setImage] =useState("");
    const [tipo, setTipo] = useState("");
    const [name_contact, setNameContacto] = useState("");
    const [num_contact, setNumContacto] = useState("");
    const [dir, setDir] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [mapKey, setMapKey] = useState(0);
    const [create , setCreate] = useState(false);

    const isFormValid = name && dir && tipo && name_contact && num_contact;

    useEffect(() => {
        setMapKey(mapKey + 1);
    }, [store.lat, store.lng]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(image);
            const url_img = temp[0];
            const idu_img = temp[1]

            const sucursale = {
                name: name,
                type: tipo,
                url_img: url_img,
                idu_img: idu_img,
                name_contact: name_contact,
                num_contact: num_contact,
                dir: dir,
                city : city,
                country : country,
                id_Restaurant : localStorage.getItem("id")
            };
            await actions.postSucursales (sucursale);
            setCreate(true);
        } catch (error) {
            console.error(error)
        }
    }

    const handleGetLatLng = async (e) => {
        e.preventDefault();
        await actions.getLatLng(`${dir.replace(/ /g, "+")},+${city},+${country}`);
    };
    
    return (
        <>
        { !store.auth ? <Navigate to="/"/> :
            <div>
                <div>
                    <form>
                        { store.lat && store.lng ? <Map key={mapKey}/> : null }
                        <div>{store.lat},{store.lng}</div>
                        <div className="mb-3">
                            <label htmlFor="dir" className="form-label">Address</label>
                            <input type="text" className="form-control" id="dir" value={dir} onChange={(e) => setDir(e.target.value)} />
                            <p style={{"color":"red"}}>formato recomendado : cra100#10fsur-21 ---- cra 100 10 f sur 21</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <button onClick={handleGetLatLng}>Validar</button>
                    </form>
                </div>
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tipo" className="form-label">Tipo</label>
                        <input type="text" className="form-control" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name_contact" className="form-label">Nombre de Contacto</label>
                        <input type="text" className="form-control" id="name_contact" value={name_contact} onChange={(e) => setNameContacto(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="num_contact" className="form-label">Numero de Contacto</label>
                        <input type="text" className="form-control" id="num_contact" value={num_contact} onChange={(e) => setNumContacto(e.target.value)} />
                    </div>
                    
                    <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                    {create ? <Navigate to='/sucursales' /> : null}
                    </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
};
