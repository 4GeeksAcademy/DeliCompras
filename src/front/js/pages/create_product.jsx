import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";
import default_rest from "../../img/default_rest.jpg"

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
            <div className="row" style={{padding:"5%"}}>
                <div className="row card-body" style={{padding:"5%", border:"1px solid #dee2e6", borderRadius: "12px"}}>
                    <div className="col-12 pb-2"><h1>Nuevo Producto</h1></div>

                    <div className="col-6" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <img src={file ? URL.createObjectURL(file) : default_rest } style={{maxWidth:"200px",minWidth:"200px",padding:"auto"}}/>

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
                        <div className="mb-3">
                            <label className="form-label">Categoria</label>
                            <select className="form-select" value={cat} onChange={(e) => setCat(e.target.value)}>
                                    <option selected>Open this select menu</option>
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
                        <textarea class="form-control" id="description" style={{height:"80%"}} onChange={(e) => setDesc(e.target.value)}></textarea>
                    </div>
                    
                    <div style={{display:"flex", justifyContent:"end", marginTop: "10px"}}>
                        <button className="btn btn-success" disabled={ !isFormValid } onClick={handleSubmit} style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}><b>Crear Producto</b></button>
                        {create ? <Navigate to='/products' /> : null}
                    </div>
                </div>
            </div>
        }
        </>
    );
};