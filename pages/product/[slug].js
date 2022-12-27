import React, { useContext, useState } from 'react'
import {client , urlFor} from '../../components/lib/client'
import { useStateContext } from '../../components/context/StateContext'
import {Product} from '../../components'
import {AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar} from 'react-icons/ai'
const ProductDetails = ({product, products}) => {
  const {image, pname, details, price} =  product
   const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();
const [index, setIndex] = useState(0);
const handleBuyNow = ()=>{
    onAdd(product, qty)
}

  return (
      <div>
       {console.log(product && product.image)}
 <div className='product-detail-container'>
    <div>
        <img  src={urlFor(image && image[index])}className='product-detail-image'/>
   
    </div>
    <div className='small-images-container'>
        {image?.map((item, ind)=>{     
          return  (<img key={item} src={urlFor(item && item) }
            className={ind === index? 'small-image selected-image': 'small-image'}
            onMouse={()=>setIndex(ind)}
            /> )
        })}
    </div>
 </div>
 <div className=
 'product-detail-desc'>
    <h1>{pname && pname}</h1>
 
    <div className='reviews'>
    <div>
        
        
        <AiFillStar/> <AiFillStar/> <AiFillStar/> <AiFillStar/>
        <AiOutlineStar/>
    </div>
    <p>(20)</p> {}
    </div>
    <h4>Details:</h4>
    <p>
        {details}
    </p>
    <p className='price'>${price}</p>
    <div className='quantity'>
        <h3>Quantity:</h3>
        <p className='quantity-desc' >
            <span onClick={()=>{decQty(qty)}} className='minus'><AiOutlineMinus/></span>  <span className='num'>{qty}</span><span className='plus'onClick={incQty}><AiOutlinePlus/></span>
        </p>
    </div>
    <div className='buttons'>
        <button type="button" className='add-to-cart' onClick={()=> onAdd(product, qty)}>add to cart</button>   <button type="button" className='buy-now' onClick={handleBuyNow}>Buy Now</button>
    </div>
 </div>
 <div className='maylike-products-wrapper'>
    <h2>You may also like</h2>
    <div className='marquee'>
        <div className='maylike-products-container track'>
            {products && products.map((item)=>{return(<Product key={item._id} product={item}/>) })}
            
            {/* {console.log(products)} */}
        </div>

    </div>
    
 </div>
    </div>
  )
}
export const getStaticProps = async ({params: {slug}})=>{
const query = `*[_type == 'product' && slug.current == "${slug}"][0]`
const productsQuery = '*[_type == "product"]'
const product = await client.fetch(query);
const  products = await client.fetch(productsQuery)


return {props :{
    product, products
}}

}
export const getStaticPaths = async()=>{
    const querry = '*[_type == "product"]{slug{current}}';
    const products = await client.fetch(querry);
    const paths = await products.map((product)=>{
        params : {
            slug : product.slug.current
        }
    })

    return {
        paths: [
         
    ],
        fallback: 'blocking'
    }
}


export default ProductDetails
