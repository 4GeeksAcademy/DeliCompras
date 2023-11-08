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
				restaurantes: [],
		  
			},
			actions: {
			getRestaurantes: async() => {
					
					const response = await fetch(process.env.BACKEND_URL + 'api/restaurantes')
					const body = await response.json();
					setStore({restaurantes: body})
					//console.log(categorias)
	
				},
	
				crear_restaurantes : (obj) => {
					fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/restaurantes", {
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
					fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/restaurantes/"+id, {
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
					fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/restaurantes/"+id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
					}).then((response) => response.json())
					.then((data) => console.log(data))
				},
				
		 
			}
		};
	};
	
	export default getState;