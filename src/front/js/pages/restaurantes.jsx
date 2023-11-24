import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link, Navigate } from "react-router-dom";

export const Restaurantes = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.auth ? actions.getRestaurants() : null;
  }, []);

  return (
    <>
    { !store.auth ? <Navigate to="/" /> :
      <div class="card-body" style={{padding:"3% 15% 3% 5%"}}>
        <h1 className="p-3">Restaurantes</h1>
        <div class="table-responsive" style={{borderRadius:"8px"}}>
          <table class="table table-centered table-hover text-nowrap table-borderless mb-5 table-with-checkbox">
            <thead class="bg-light">
              <tr>
                <th style={{paddingLeft:"30px"}}>Id</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Nombre de Contacto</th>
                <th>Numero de Contacto</th>
                <th>Sucursales</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {store.restaurants.map((item) => (
                <tr style={{}}>
                  <td>{item.id}</td>
                  <td className="td"><b>{item.name}</b></td>
                  <td>{item.type}</td>
                  <td>{item.name_contact}</td>
                  <td>{item.num_contact}</td>
                  <td></td>
                  <td className="td">
                    <div class="dropdown">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                      </svg>
                      <ul class="dropdown-menu" style={{borderRadius:"8px"}}>
                        <li><a class="dropdown-item" href="#" style={{width:"90%", margin:"auto", borderRadius:"8px"}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" style={{margin:" 2px 12px 5px 0px"}}>
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg>
                          Editar
                        </a></li>
                        <li><a class="dropdown-item" href="#" style={{width:"90%", margin:"auto", borderRadius:"8px"}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{margin:" 2px 12px 5px 0px"}}>
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                          Borrar
                        </a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => actions.setSelectOpcion(5)} className="btn btn-success" style={{borderRadius:"8px" ,backgroundColor:"#0aad0a"}}><b>Nuevo Producto</b></button>
        </div>
      </div>
    }
    </>
  );
};

