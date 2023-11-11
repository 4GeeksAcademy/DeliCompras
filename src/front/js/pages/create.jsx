import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link , Redirect } from "react-router-dom";

export const Create = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState(null);
    let idu_img;

    const isIdUnique = !(store.products.some(product => product.id == id));
    const isFormValid = name && desc && price && amount && isIdUnique && id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(file);
            console.log(temp)
            const url_img = temp[0];
            idu_img = temp[1]

            const product = {
                id: id,
                name: name,
                description: desc,
                price: price,
                amount: amount,
                url_img: url_img,
                idu_img: idu_img
            };

            await actions.postProduct(product);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form>
                <img width="100" src={file ? URL.createObjectURL(file) : null } alt="Imagen Seleccionada" />

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
                    <label htmlFor="id" className="form-label">Id</label>
                    <input type="number" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                {isIdUnique ? null : <p style={{"color": "red"}}>"Id ya existe"</p>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                
                <button disabled={ !isFormValid } onClick={handleSubmit}>Crear Producto</button>
            </form>
        </div>
    );
};
