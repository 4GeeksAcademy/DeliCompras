import { initializeApp } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL } from "firebase/storage";
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
      products: []
    },
    actions: {
      updateList: () => {
        fetch("https://cuddly-system-qgj7jwpqpvj3r57-3001.app.github.dev/api/products",
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }).then( response => response.json())
          .then( data => setStore({ products: data }));
      },
      updateProduct: (id, obj) => {
        fetch(`https://cuddly-system-qgj7jwpqpvj3r57-3001.app.github.dev/api/product/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then(response => response.json())
          .then(data => console.log(data));
      },      
      createdProduct: (obj) => {
        fetch("https://cuddly-system-qgj7jwpqpvj3r57-3001.app.github.dev/api/product", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then( response => response.json())
          .then( data => console.log(data))
      },
      deleteProduct: (id) => {
        fetch("https://cuddly-system-qgj7jwpqpvj3r57-3001.app.github.dev/api/product/" + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then( response => response.json())
          .then( data => console.log(data))
      },
      upload_img : async (file) => {
        const storageRef = ref( storage , v4())
        await uploadBytes( storageRef,file )
        const url = await getDownloadURL(storageRef)
        return url
      }
    }
  };
};

export default getState;
