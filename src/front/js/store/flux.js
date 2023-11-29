import { initializeApp } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL , deleteObject } from "firebase/storage";
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCTl4wrYj2POTt1u8QvB-quHKaqBnLeck4",
  authDomain: "proyect-6a0a9.firebaseapp.com",
  projectId: "proyect-6a0a9",
  storageBucket: "proyect-6a0a9.appspot.com",
  messagingSenderId: "179931426073",
  appId: "1:179931426073:web:5da5559c9594898541e988"
};
  
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const getState = ({ getStore, getActions, setStore }) => {
  
	return {
		store: {
			categories: [],
			products: [],
			carrito: [],
			restaurants: [],
			sucursales: [],
			order: [],
			selectSucursale: null,
			lat: 4.6556,
			lng: -74.07,
			auth: false,
			user: null,
			creado: null,
			priceOrder: null,
			selectOpcion: null,
			name: null,
			errorLogin : false
		},
		actions: { 
			setErrorLogin : (i) => {
				setStore({errorLogin : i})
			},
			setSelectOpcion : (opcion) => {
				setStore({selectOpcion : opcion})
				console.log(opcion)
			},
			setPriceOrder: (price) => {
				setStore({priceOrder : price})
			},
			vaciar: () => {
				setStore({creado : false})
			},
			creado: () => {
				setStore({creado : true})
			},
			validar: () => {
				if ( localStorage.getItem("id") && localStorage.getItem("token")) {
					setStore({ auth : true})
				}
			},
			postUser: async (name,password) => {
				await fetch(process.env.BACKEND_URL + "api/login_user", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name : name,
						password: password
					})
				})
				.then((response)=> {
					if (response.status == 200){
						setStore({ auth : true})
					}
					else{
						setStore({ errorLogin : true })
					}
					return response.json()
				})
				.then((data)=> {
					localStorage.setItem("token",data.token);
					localStorage.setItem("id",data.user_id);
					setStore({user : data.user})
					setStore({name : data.name})
				})
				await getActions().getCart()
			},
			postAdmin: (email,password) => {
				fetch(process.env.BACKEND_URL + "api/login_admin", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email : email,
						password: password
					})
				})
				.then((response)=> {
					if (response.status == 200){
						setStore({ auth : true})
					}
					else {
						setStore({ errorLogin : true })
					}
					return response.json()
				})
				.then((data)=> {
					localStorage.setItem("token",data.token);
					localStorage.setItem("id",data.user_id);
					setStore({user : data.user})
				})
			},
			logout : () => {
				setStore({ auth : false});
				localStorage.removeItem("token");
				localStorage.removeItem("id")
				setStore({user : "null"})
				getActions().getCart()
			},
			postRegister: (user) => {
				fetch(process.env.BACKEND_URL + "api/user", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(user)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},
      		getCategories: async() => {
				const response = await fetch(process.env.BACKEND_URL + 'api/category')
				const body = await response.json();
				setStore({categories: body})
			},

			postCategories : async (obj) => {
				await fetch(process.env.BACKEND_URL + "api/category", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
				await getActions().getCategories()
			},

			putCategories : async (id,obj) => {
				await fetch(process.env.BACKEND_URL + 'api/category/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj) 
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data));
				await getActions().getCategories()
			},

			deleteCategories : async (id) => {
				await fetch(process.env.BACKEND_URL + 'api/category/'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getCategories()
			},

			getRestaurants: async() => {
					const response = await fetch(process.env.BACKEND_URL + 'api/restaurant')
					const body = await response.json();
					setStore({restaurants: body})
				},

			postRestaurants : async (obj) => {
				await fetch(process.env.BACKEND_URL + 'api/restaurant', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
				await getActions().getRestaurants()
			},
	
			putRestaurants : async (id,obj) => {
				await fetch(process.env.BACKEND_URL + 'api/restaurant/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
				await getActions().getRestaurants()
			},
	
			deleteRestaurants : async (id) => {
				await fetch(process.env.BACKEND_URL + 'api/restaurant/'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getRestaurants()
			},

			getSucursales: async() => {
				const response = await fetch(process.env.BACKEND_URL + 'api/sucursale', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem("token")}`
					}
				})
				const body = await response.json();
				setStore({sucursales: body});
			},
	
			postSucursales : async (obj) => {
				await fetch(process.env.BACKEND_URL + "api/sucursale", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
				await getActions().getSucursales()
			},
	
			putSucursales : async (id,obj) => {
				await fetch(process.env.BACKEND_URL + "/api/sucursale/"+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data))
				await getActions().getSucursales()
			},
	
			deleteSucursales : async (id) => {
				await fetch(process.env.BACKEND_URL + "/api/sucursale/"+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getSucursales()
			},
			
			getList: () => {
				fetch(process.env.BACKEND_URL + 'api/products', 
				{
					headers: {
						'Content-Type': 'application/json'
					},
				})
				.then( response => response.json())
				.then( data => setStore({ products: data }));
			},

			putProduct: async (id, obj) => {
				await fetch(process.env.BACKEND_URL + `api/products/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then(response => response.json())
				.then(data => console.log(data));
				
				const product = await getStore().products.find(product => product.id == id) 

				/*if (product.url_img != obj.url_img){
					const storageRef = ref( storage , `products/${obj.idu_img}`);
					await deleteObject(storageRef);
				}*/
				await getActions().getList()
			},      

			postProduct: async (obj) => { 
				await fetch(process.env.BACKEND_URL + 'api/products', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then( response => response.json())
				.then( data => console.log(data))
				await getActions().getList()
			},

			deleteProduct: async (id) => {
				await fetch(process.env.BACKEND_URL + 'api/products/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				}).then( response => response.json())
				.then( data => console.log(data));
				
				await getActions().getList()
				//const storageRef = ref( storage , `products/${idu}`);
				//await deleteObject(storageRef);
			},

			upload_img : async (file) => {
				const idu =v4()
				const storageRef = ref( storage , `products/${idu}`)
				await uploadBytes( storageRef,file )
				const url = await getDownloadURL(storageRef)
				return [url,idu]
			},

			getCart :  () => {
				fetch(process.env.BACKEND_URL + 'api/cart', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				})
				.then((response) => response.json())
				.then((data) =>{setStore({ carrito: data });console.log("carrito", data)})
			},

			putCart : async (updatedCart , id) => {
				await fetch(process.env.BACKEND_URL + 'api/cart/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedCart)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getCart()
			},

			addOrderCart : async (updatedCart , id) => {
				await fetch(process.env.BACKEND_URL + 'api/cart_add_idOrder/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedCart)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getCart()
			},

			postCart: async (amount,id_product,id_restaurant) => {
				await fetch(process.env.BACKEND_URL + 'api/cart', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						amount : amount,
						id_Product : id_product,
						id_Restaurant : id_restaurant,
						id_Order: null
					}) 
				})
				.then( response => response.json())
				.then( data => console.log(data))
				await getActions().getCart()
			},

			deleteCart : async (id) => {
				await fetch(process.env.BACKEND_URL + 'api/cart/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then( response => response.json())
				.then( data => console.log(data));
				await getActions().getCart()
			},

			getOrder :  (token) => {
				fetch(process.env.BACKEND_URL + 'api/order', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				})
				.then((response) => response.json())
				.then((data) =>{setStore({ order : data });console.log(data)})
			},

			getAllOrder : (token) => {
				fetch(process.env.BACKEND_URL + 'api/all_order', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				})
				.then((response) => response.json())
				.then((data) => setStore({ order : data }))
			},

			putOrder : async (updatedOrder , id) => {
				console.log(updatedOrder)
				await fetch(process.env.BACKEND_URL + 'api/order/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedOrder)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
				await getActions().getAllOrder(localStorage.getItem("token"))
			},

			postOrder: async (order) => {
				order.id = v4();
				console.log(order);
				await fetch(process.env.BACKEND_URL + 'api/order', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(order) 
				})
				.then( response => response.json())
				.then( data => console.log(data))
				await getActions().getOrder(localStorage.getItem("token"))
				return order.id;
			},

			deleteOrder : async (id) => {
				await fetch(process.env.BACKEND_URL + 'api/order/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then( response => response.json())
				.then( data => console.log(data));
				await getActions().getAllOrder(localStorage.getItem("token"))
			},

			getLatLng: (address) => {
				fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCj5o1FRwG7gBoDGpjpRddscMfNZ6Z0_cI")
				.then(response => response.json())
				.then(data => {
					setStore({ lat : data.results[0].geometry.location.lat})
					setStore({ lng : data.results[0].geometry.location.lng})
				})
			},
			setSelectSucursale: (index) => {
				setStore({ selectSucursale: index })
				console.log(getStore().selectSucursale)
			},
		}
	};
};

export default getState;