import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export const Carousel = () => {
    const {store} = useContext(Context);
    const groupedItems = chunkArray(store.categories , 4);

    return (
        <div id="carousel" className="carousel slide" data-bs-ride="carousel" style={{display:"flex", justifyContent:"center", margin:"80px 3%"}}>
            <div className="carousel-inner" style={{maxWidth:"100%"}}>
                <h3 style={{marginBottom:"9px"}} ><b>Categorías Destacadas</b></h3>
                {groupedItems.map((group, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    {group.map((item, itemIndex) => (
                    <div className="item" key={itemIndex} style={{width: "30%" , height:"218px"}}>
                        <div className="item slick-slide p-3" style={{width: "100%", height: "100%"}} tabIndex="-1" data-slick-index="7" aria-hidden="true">
                            <Link to={`/lista_por_categorias/${item.id}`} style={{textDecoration:"none"}}>
                                <div className="card card-product mb-lg-4" style={{height:"100%", borderRadius:"8px"}}>
                                    <div className="card-body text-center py-8" style={{display:"flex",flexDirection:"column",height:"100%",justifyContent: "center",alignItems:"center"}}>
                                        <img src={item.url_img} alt="categoria" className="mb-3" style={{width: "100px", height:"100px"}}/>
                                        <div className="text-truncate">{item.name}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    ))}
                </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};