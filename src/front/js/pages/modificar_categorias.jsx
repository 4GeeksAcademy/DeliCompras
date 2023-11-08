import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Modificar_categorias = () => {
    const { theid } = useParams();
    const { store, actions } = useContext(Context);

    const categorias = store.categorias.find(categorias => categorias.id == theid);
    const [name, setName] = useState(categorias.name || "");
    const [img, setUrl] = useState(categorias.url || "");
    const [file, setFile] = useState(null);
    const [idu, setIdu] = useState(categorias.idu || "");
    

    const isFormValid = name && img;

    const guardar = async (e) => {
        e.preventDefault();
        try {
            let url;
            if (file) {
                const temp = await actions.upload_img(file);
                url = temp[0];
                setIdu(temp[1])
            }else url = img

            const objeto = {
                name: name,
                url: url,
                idu: idu
            };
            await actions.modificar_categorias(theid, objeto);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form>
                <img width="100" src={file ? URL.createObjectURL(file) : img} alt="Imagen Seleccionada" />

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
                
                <Link to="/categorias">
                    <button disabled={!isFormValid} onClick={guardar}>Guardar Cambios</button>
                </Link>
                <Link to="/categorias">
                    <button onClick={() => actions.delete(theid)}>Delete </button>
                </Link>
            </form>
        </div>
    );
};