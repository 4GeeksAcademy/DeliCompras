import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Create = () => {
    const { store, actions } = useContext(Context);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const isIdUnique = !(store.products.some(product => product.id == id))
    const isFormValid = name && desc && price && amount && isIdUnique && id && selectedImage;
    

    const objeto = {
        id : id,
        name: name,
        description: desc,
        price: price,
        amount: amount,
        img : selectedImage
    };

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Img</label>
                    <input
                        id="img"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
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
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <Link to="/products">
                    <button disabled={!isFormValid} onClick={() => actions.created(objeto)}>Guardar Cambios</button>
                </Link>
            </form>
        </div>
    );
};
