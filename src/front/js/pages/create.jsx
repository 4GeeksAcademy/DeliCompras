import React, { useContext , useState} from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Create = () => {
    const {store, actions } = useContext(Context)
    const [name , setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price , setPrice] = useState("")
    const [amount , setAmount] = useState("")

    const objeto = {
        name : name,
        description : desc,
        price : price,
        amount : amount
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="example" className="form-label">Name</label>
                    <input type="text" className="form-control" id="example" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="example" className="form-label">description</label>
                    <input type="text" className="form-control" id="example" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="example" className="form-label">Price</label>
                    <input type="text" className="form-control" id="example" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="example" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="example" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                </div>
                <Link to="/products">
                    <button onClick={() => actions.change(1, objeto)}>Guardar Cambios</button>
                </Link>

            </form>
        </div>
    )
}