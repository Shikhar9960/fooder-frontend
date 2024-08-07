import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getCartTotalAmount , url } = useContext(StoreContext)

  const nevigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>quantity</p>
          <p>total</p>
          <p>remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div className='cart-items-title cart-items-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>cart total</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>delivery fee</p>
              <p>${getCartTotalAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>total</p>
              <b>${getCartTotalAmount()===0?0:getCartTotalAmount() + 2}</b>
            </div>
          </div>
          <button onClick={()=>nevigate('/order')}>Proceed to checkout</button>

        </div>
        <div className="cart-promocode">
          <div className="">
            <p>if you have promo code, please enter here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
