const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			products : []
		},
		actions: {
			// Use getActions to call a function within a fuction
			actualizarlist : () => {
				fetch("https://vigilant-carnival-wjprpwg79p7h54g-3001.app.github.dev/api/products",
				{
					headers: {
						'Content-Type': 'application/json'
					},
				}).then((response)=>response.json())
				.then((data)=> setStore({ products : data }));
			},
			change : (id,obj) => {
				fetch("https://vigilant-carnival-wjprpwg79p7h54g-3001.app.github.dev/api/product/"+id, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=>response.json())
				.then((data)=> console.log(data));
			},
			created : (obj) => {
				fetch("https://vigilant-carnival-wjprpwg79p7h54g-3001.app.github.dev/api/product", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(obj)
				})
				.then((response)=> response.json())
				.then((data)=> console.log(data))
			},
			delete : (id) => {
				fetch("https://vigilant-carnival-wjprpwg79p7h54g-3001.app.github.dev/api/product/"+id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
				}).then((response) => response.json())
				.then((data) => console.log(data))
			}
		}
	};
};

export default getState;
