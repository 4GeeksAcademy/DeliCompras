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
			lat: "",
			lng: "",
			auth: false
		},
		actions: { 
			postUser: (name,password) => {
				fetch(process.env.BACKEND_URL + "api/login_user", {
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
					return response.json()
				})
				.then((data)=> {
					localStorage.setItem("token",data.token);
					localStorage.setItem("id",data.user_id);
				})
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
					return response.json()
				})
				.then((data)=> {
					localStorage.setItem("token",data.token);
					localStorage.setItem("id",data.user_id);
				})
			},
			logout : () => {
				setStore({ auth : false});
				localStorage.removeItem("token");
				localStorage.removeItem("id")
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

			postCategories : (obj) => {
				fetch(process.env.BACKEND_URL + "api/category", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},

			putCategories : (id,obj) => {
				fetch(process.env.BACKEND_URL + 'api/category/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data));
			},

			deleteCategories : (id) => {
				fetch(process.env.BACKEND_URL + 'api/category/'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},

			getRestaurants: async() => {
					const response = await fetch(process.env.BACKEND_URL + 'api/restaurant')
					const body = await response.json();
					setStore({restaurants: body})
				},

			postRestaurants : (obj) => {
				fetch(process.env.BACKEND_URL + 'api/restaurant', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},
	
			putRestaurants : (id,obj) => {
				fetch(process.env.BACKEND_URL + 'api/restaurant/'+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},
	
			deleteRestaurants : (id) => {
				fetch(process.env.BACKEND_URL + 'api/restaurant/'+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},

			getSucursales: async(token) => {
				const response = await fetch(process.env.BACKEND_URL + 'api/sucursale', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				})
				const body = await response.json();
				setStore({sucursales: body});
			},
	
			postSucursales : (obj) => {
				fetch(process.env.BACKEND_URL + "api/sucursale", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},
	
			putSucursales : (id,obj) => {
				fetch(process.env.BACKEND_URL + "/api/sucursale/"+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},
	
			deleteSucursales : (id) => {
				fetch(process.env.BACKEND_URL + "/api/sucursale/"+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
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

			putProduct: (id, obj) => {
				fetch(process.env.BACKEND_URL + `api/products/${id}`, {
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
					storageRef = ref( storage , `products/${obj.idu}`);
					deleteObject(storageRef);
				}
			},      

			postProduct: (obj) => {
				fetch(process.env.BACKEND_URL + 'api/products', {
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
				fetch(process.env.BACKEND_URL + 'api/products/' + id, {
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
			},

			getCart :  () => {
				fetch(process.env.BACKEND_URL + 'api/cart', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				})
				.then((response) => response.json())
				.then((data) =>{setStore({ carrito: data });console.log(data)})
			},

			putCart : (updatedCart , id) => {
				fetch(process.env.BACKEND_URL + 'api/cart/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedCart)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},

			addOrderCart : (updatedCart , id) => {
				fetch(process.env.BACKEND_URL + 'api/cart_add_idOrder/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedCart)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},

			postCart: (amount,id_product,id_restaurant) => {
				fetch(process.env.BACKEND_URL + 'api/cart', {
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
			},

			deleteCart : (id) => {
				fetch(process.env.BACKEND_URL + 'api/cart/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then( response => response.json())
				.then( data => console.log(data));
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

			getAllOrder :  (token) => {
				fetch(process.env.BACKEND_URL + 'api/all_order', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				})
				.then((response) => response.json())
				.then((data) => setStore({ order : data }))
			},

			putOrder : (updatedOrder , id) => {
				console.log(updatedOrder)
				fetch(process.env.BACKEND_URL + 'api/order/'+ id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedOrder)
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},

			postOrder: (order) => {
				order.id = v4();
				console.log(order);
				fetch(process.env.BACKEND_URL + 'api/order', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(order) 
				})
				.then( response => response.json())
				.then( data => console.log(data))
				return order.id;
			},

			deleteOrder : (id) => {
				fetch(process.env.BACKEND_URL + 'api/order/' + id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then( response => response.json())
				.then( data => console.log(data));
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
			}
		}
	};
};

export default getState;