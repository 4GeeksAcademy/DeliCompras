import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, Navigate } from "react-router-dom";

export const Modificar_productos = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    const product = store.products.find(product => product.id == id);
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(product.url_img || "");
    const [idu, setIdu] = useState(product.idu_img || "");
    const [name, setName] = useState(product.name || "");
    const [desc, setDesc] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || "");
    const [amount, setAmount] = useState(product.amount || "");
    const [cat, setCat] = useState(product.id_category || "")
    const [create , setCreate] = useState(false)

    const isFormValid = name && desc && price && amount;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url;
            if (file) {
                const temp = await actions.upload_img(file);
                url = temp[0];
                setIdu(temp[1])
            }else url = img

            const product = {
                id: id,
                name: name,
                description: desc,
                price: price,
                amount: amount,
                url: url,
                idu : idu,
                id_category: cat
            }
            await actions.putProduct(id, product);
            setCreate(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        { !store.auth ? <Navigate to="/products" /> :
            <form>
                <img width="100" src={ file === null ? img : URL.createObjectURL(file)} alt="Imagen Seleccionada" />

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

                <button disabled={!isFormValid} onClick={handleSubmit}>Guardar Cambios</button>
                {create ? <Navigate to='/products' /> : null}

                <Link to="/products">
                    <button onClick={() => actions.deleteProduct(id,idu)}>Delete </button>
                </Link>
            </form>
        }    
        </>
    );
};
