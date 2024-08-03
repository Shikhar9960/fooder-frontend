import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const { getCartTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotalAmount() + 2,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }

  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getCartTotalAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>delivery information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='last name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='email address' />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zip code' />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
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
              <p>${getCartTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>total</p>
              <b>${getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + 2}</b>
            </div>
          </div>
          <button type='submit' >Proceed to payment</button>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
