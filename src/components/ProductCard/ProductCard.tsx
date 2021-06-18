import React, { FunctionComponent, HTMLAttributes } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Product } from '../../models/product.model'
import './ProductCard.css'

interface Props extends RouteComponentProps, HTMLAttributes<HTMLDivElement>{
    product : Product
}

const ProductCardComponent: FunctionComponent<Props> = ({ history,product }) => {

    //redirect on the product path for is 3d rendering
    const onClick = () => {
        history.push(product.path) 
    }

    return (
        <div className='ProductCard'>
            <div className='ProductText' onClick={() => onClick()}>
                <h1 className='ProductName'>
                    {product.name}
                </h1>
                <p className='ProductDesc'>
                    {product.desc}
                </p>
            </div>
            <img className='ProductImg' src={product.img} alt={product.name}/>
            <div className='ProductBottom'>
                <h1 className='ProductOption'>
                    {product.option}
                </h1>
                <button className='ProductButton' onClick={() => onClick()}>
                    See Model
                </button>
            </div>
        </div>
    )
}

export const ProductCard = withRouter(ProductCardComponent)



