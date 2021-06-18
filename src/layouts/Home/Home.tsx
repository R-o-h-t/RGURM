import React, { FunctionComponent, HTMLAttributes, useState } from 'react' 
import { ProductCard } from '../../components/ProductCard/ProductCard' 
import { Categories } from '../../models/categorie.model' 
import { Product, products } from '../../models/product.model' 

import './Home.css' 
interface HomePageProps extends HTMLAttributes<HTMLDivElement> {}


const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value: number)  => value + 1); // update the state to force render
}

const Home: FunctionComponent<HomePageProps>  = () => {

  const forceUpdate = useForceUpdate()

  //set the categories array as a member of the state
  const [selectedCategories,setSelectedCategories] = useState<String[]>([])

  //toggle the given categories on/off the filter list
  const toggleCategorie = (categorie : string) =>{
    let array = selectedCategories
    const index = array.indexOf(categorie) 

    if (index > -1)
      array.splice(index, 1)
    else
      array.push(categorie)
    setSelectedCategories(array)
    forceUpdate()
  }

  //select the products depending on the filtered categories 
  const selectedProducts = () => {
    let Products : Product[] = []
    if(selectedCategories.length === 0)
      return products
    products.forEach(product =>{
      product.categories.forEach(categorie =>{
        if(selectedCategories.includes(categorie) && !Products.includes(product)){
          Products.push(product) 
        }
          
      })
    })
    return Products
  }
  const Products = selectedProducts()
  console.log(Products)  

  return (
    <div className='Home'>
      <div className='categoriesBar'>
        <h3>‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎Filters</h3>
          {Categories.map((categorie)=>{
            return(
              <div>
                <input type="checkbox" defaultChecked={selectedCategories.includes(categorie)} onChange={()=>{toggleCategorie(categorie)}}/>
                <label>‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎
                  {categorie}
                </label>
              </div>
            )
          })} 
      </div>  
      <div className='products'>
        {Products.map((product)=>{return(<ProductCard product = {product}/>)})} 
        {/* Display a product card for product of the filtered array */}
      </div>
    </div>
  ) 
}


export default Home
