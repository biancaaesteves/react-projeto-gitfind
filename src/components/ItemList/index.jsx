import React from 'react';
import './styles.css'

function ItemList({title, description, link}) {
    return <div className="item-list">
        <strong>{title}</strong>
        <p>{description}</p>
        <p className='link'>{link}</p>
      <hr />
    </div>;
}

export default ItemList;
