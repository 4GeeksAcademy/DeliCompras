import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link , Navigate } from "react-router-dom";
import { Map } from "../component/map.jsx";
import rest from "../../img/default_rest.jpg"

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
        <div className="card" style={{marginTop:"30px", borderColor:"#0aad0a", minHeight:"750px"}}>
        { !store.auth ? <Navigate to="/"/> :
            <div className="row card-body p-0">
                <div className="col p-0" style={{borderRight:"1px solid #0aad0a"}}>
                    <div style={{maxWidth: "80%", margin:"auto auto"}}>
                    <form>
                    <div style={{width:"300px", height:"300", margin:"auto", padding: "20px"}}>
                        <img width="100%" height="100%" src={image ? URL.createObjectURL(image) : rest } alt="Imagen Seleccionada" />
                    </div>

                    <div className="mb-3">
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
                    
                    
                    </form>
                    </div>
                </div>
                <div className="col p-0">
                    <div  style={{maxWidth: "80%", margin:"auto auto"}}>
                    <div className="container" style={{width:"280px", height:"280px", margin:"10px"}}>
                        { store.lat && store.lng ? <Map key={mapKey}/> : null }
                    </div>
                    <div>
                        <label htmlFor="dir" className="form-label">Address</label>
                        <input type="text" className="form-control" id="dir" value={dir} onChange={(e) => setDir(e.target.value)} />
                        <p style={{"color":"red"}}>formato recomendado : cra100#10fsur-21 ---- cra 100 10 f sur 21</p>
                    </div>

                    <div className="mb-3" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{maxWidth:"45%"}}>
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div style={{maxWidth:"45%"}}>
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                    </div>
                    <button className="mb-5" onClick={handleGetLatLng}>Validar</button>
                    </div>

                    <div className="d-flex justify-content-end mt-5" style={{maxWidth:"90%"}}>
                        <button className="btn btn-success" style={{backgroundColor:"#0aad0a"}} disabled={!isFormValid} onClick={handleSubmit}><b>Guardar Cambios</b></button>
                        {create ? <Navigate to='/sucursales' /> : null}
                    </div>
                </div>
            </div>
        }
        </div>
    );
};
