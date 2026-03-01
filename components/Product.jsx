import React from 'react';
import Link from 'next/link';
import { urlFor } from "../lib/client";
import { trackEvent } from '../lib/mixpanel';

const Product = ({ product: { image, name, slug, price, _id } }) => {

  const handleProductClick = () => {
    trackEvent('Product Clicked', {
      product_id: _id,
      name,
      price,
    });
  };

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card' onClick={handleProductClick}>
          <img src={urlFor(image && image[0])}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>₹{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
