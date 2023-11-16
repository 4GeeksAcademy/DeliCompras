import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

export const Create_productos = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState("")
    const [create , setCreate] = useState(false)
    let idu_img;

    const isFormValid = name && desc && price && amount && cat;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const temp = await actions.upload_img(file);
            const url_img = temp[0];
            idu_img = temp[1]

            const product = {
                name: name,
                description: desc,
                price: price,
                amount: amount,
                url_img: url_img,
                idu_img: idu_img,
                id_category: cat
            };

            await actions.postProduct(product);
            setCreate(true)
        } catch (error) {
            console.error(error);
            console.log("hola")
        }
    }

    return (
        <>
        { !store.auth ? <Navigate to="/products"/> :
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div>
                        <label className="form-label">Categoria</label>
                        <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)}>
                            {store.categories.map((item) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
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
                    {create ? <Navigate to='/products' /> : null}
                </form>
            </div>
        }
        </>
    );
};