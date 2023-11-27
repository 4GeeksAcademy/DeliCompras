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
        { !store.auth ? <Navigate to="/products"/> :
            <div className="row" style={{padding:"5%"}}>
                <div className="row card-body" style={{padding:"5%", border:"1px solid #dee2e6", borderRadius: "12px"}}>
                    <div className="col-12 pb-2"><h1>Nuevo Producto</h1></div>

                    <div className="col-6" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img src={ file === null ? img : URL.createObjectURL(file)} style={{maxWidth:"200px",minWidth:"200px",padding:"auto"}}/>

                        <div className="mb-3">
                            <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={(e)=> {setFile(e.target.files[0])}}
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label">Categoria</label>
                            <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)}>
                                {store.categories.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                    </div>

                    <div className="col-6 mb-3" >
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" style={{height:"80%"}} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    
                    <div style={{display:"flex", justifyContent:"end", marginTop: "10px"}}>
                        <button className="btn btn-success" disabled={ !isFormValid } onClick={handleSubmit} style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}><b>Guardar Cambios</b></button>
                        {create ? <Navigate to='/products' /> : null}
                    </div>
                </div>
            </div>
        }
        </>
    );
};

