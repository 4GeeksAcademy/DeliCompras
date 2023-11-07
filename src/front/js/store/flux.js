const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			categorias: [],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				

				//reset the global store
				setStore({ demo: demo });
			},

			getCategorias: async() => {
				
				const response = await fetch(process.env.BACKEND_URL + 'api/categorias')
				const body = await response.json();
				setStore({categorias: body})
				//console.log(categorias)

			},

			crear : (obj) => {
				fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/categorias", {
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
				fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/categorias/"+id, {
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
				fetch("https://effective-carnival-xj7v9v7449g3664q-3001.app.github.dev/api/categorias/"+id, {
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
