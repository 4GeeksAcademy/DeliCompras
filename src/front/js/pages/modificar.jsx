import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Modificar = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    const product = store.products.find(product => product.id == id);
    const [name, setName] = useState(product.name || "");
    const [desc, setDesc] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || "");
    const [amount, setAmount] = useState(product.amount || "");

    const isFormValid = name && desc && price && amount;

    const objeto = {
        name: name,
        description: desc,
        price: price,
        amount: amount
    };

    return (
        <div>
            <form>
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
                    <button disabled={!isFormValid} onClick={() => actions.change(id, objeto)}>Guardar Cambios</button>
                </Link>
                <Link to="/products">
                    <button onClick={() => actions.delete(id)}>Delete </button>
                </Link>
            </form>
        </div>
    );
};
