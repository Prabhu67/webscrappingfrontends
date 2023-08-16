import { useEffect, useState } from 'react';
import './App.css';
import Base from './base/Base';
import Header from './header/Header';

function App() {
  const [products,setProducts] = useState();
 

// Fetch priduct from my-API
useEffect(()=>{
  async function getProducts(){ 
    const response = await fetch("https://web-scraping-918g.onrender.com/products",
    {method:'GET',})
    const data = await response.json();
  
   
    setProducts(data.data)
    // console.log(products)
  };
   
  getProducts();
},[products]);

  return (
    <div className="App">
        <Base
        products={products}
        setProducts={setProducts}
        /> 
        <Header
        products={products}
        setProducts={setProducts}
        />    
    </div>
  );
}

export default App;