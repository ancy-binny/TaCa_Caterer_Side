import React from 'react'
import Header from '../../Components/Header/Header'
import Orders from '../../Components/Orders/Orders'
import Footer from '../../Components/Footer/Footer'

function OrderPage() {
  return (
    <>
    <Header/>
    <main className="order-page-main">
        <Orders/>
      </main>     
    <Footer/>
    </>
  )
}

export default OrderPage