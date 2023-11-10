import { initializeApp } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL , deleteObject } from "firebase/storage";
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
};
  
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const getState = ({ getStore, getActions, setStore }) => {
  
	return {
		store: {
			categorias: [],
      		products: [],
			restaurantes: [],
			sucursales: [],
		},
		actions: {
        	getCategorias: async() => {
				
				const response = await fetch(process.env.BACKEND_URL + 'api/categorias')
				const body = await response.json();
				setStore({categorias: body})
				//console.log(categorias)

			},

			crear : (obj) => {
				fetch(process.env.BACKEND_URL + "api/categorias", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},

			modificar_categorias : (id,obj) => {
				fetch(process.env.BACKEND_URL + 'api/categorias'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},

			delete : (id) => {
				fetch(process.env.BACKEND_URL + 'api/categorias'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				}).then((response) => response.json())
				.then((data) => console.log(data))
			},

			getRestaurantes: async() => {
					
					const response = await fetch(process.env.BACKEND_URL + 'api/restaurantes')
					const body = await response.json();
					setStore({restaurantes: body})
					//console.log(categorias)
	
				},
	
				crear_restaurantes : (obj) => {
					fetch(process.env.BACKEND_URL + 'api/restaurantes', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
					})
					.then((response)=> response.json())
					.then((data)=> console.log(data))
				},
	
				modificar_restaurantes : (id,obj) => {
					fetch(process.env.BACKEND_URL + 'api/restaurantes'+id, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
					})
					.then((response)=>response.json())
					.then((data)=> console.log(data));
				},
	
				delete : (id) => {
					fetch(process.env.BACKEND_URL + 'api/restaurantes'+id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
					}).then((response) => response.json())
					.then((data) => console.log(data))
				},

				getSucursales: async() => {
					
					const response = await fetch(process.env.BACKEND_URL + 'api/sucursales')
					const body = await response.json();
					setStore({sucursales: body})
					
	
				},
	
				crear_sucursales : (obj) => {
					fetch(process.env.BACKEND_URL + "api/sucursales", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
					})
					.then((response)=> response.json())
					.then((data)=> console.log(data))
				},
	
				modificar_sucursales : (id,obj) => {
					fetch(process.env.BACKEND_URL + "/api/sucursales/"+id, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
					})
					.then((response)=>response.json())
					.then((data)=> console.log(data));
				},
	
				delete : (id) => {
					fetch(process.env.BACKEND_URL + "/api/sucursales"+id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
					}).then((response) => response.json())
					.then((data) => console.log(data))
				},
			
      updateList: () => {
        fetch(process.env.BACKEND_URL + 'api/products', {
            headers: {
              'Content-Type': 'application/json'
            },
          }).then( response => response.json())
          .then( data => setStore({ products: data }));
      },
      updateProduct: (id, obj) => {
        fetch(process.env.BACKEND_URL + "api/product/" + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then(response => response.json())
          .then(data => console.log(data));
        
        const product = getStore().products.find(product => product.id == id) 
        if (product.url != obj.url){
          const storageRef = ref( storage , `products/${obj.idu}`);
          deleteObject(storageRef);
        }
      },      
      createdProduct: (obj) => {
        fetch(process.env.BACKEND_URL + 'api/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then( response => response.json())
          .then( data => console.log(data))
      },
      deleteProduct: (id,idu) => {
        fetch(process.env.BACKEND_URL + 'api/product' + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then( response => response.json())
          .then( data => console.log(data));

        const storageRef = ref( storage , `products/${idu}`);
        deleteObject(storageRef);
      },
      upload_img : async (file) => {
        const idu =v4()
        const storageRef = ref( storage , `products/${idu}`)
        await uploadBytes( storageRef,file )
        const url = await getDownloadURL(storageRef)
        return [url,idu]
      }	
			
		}
	};
};

export default getState;
