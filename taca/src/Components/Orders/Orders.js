// Orders.js
import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from '../../axiosConfig';

const Orders = () => {


  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/${id}`); // Replace with the actual catererId
        const incomingOrders = response.data.filter(order => !order.accepted);
        const acceptedOrders = response.data.filter(order => order.accepted);

        setOrders(incomingOrders);
        setAcceptedOrders(acceptedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCardClick = (index) => {
    const newOrders = [...orders];
    newOrders[index].expanded = !newOrders[index].expanded;
    setOrders(newOrders);
  };

  const handleAccept = async (index) => {
    try {
      const order = orders[index];
      console.log(order,'helloo');
      
      await axios.post(`/orders/accept/${order._id}`);
      const acceptedOrder = {
        ...order,
        status: { packed: false, sent: false, delivered: false, payment: false },
        completed: false,
      };
      setAcceptedOrders([...acceptedOrders, acceptedOrder]);
      const newOrders = [...orders];
      newOrders.splice(index, 1);
      setOrders(newOrders);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  

  const handleReject = async (index) => {
    try {
      const order = orders[index];
      await axios.delete(`/orders/reject/${order._id}`);
      const newOrders = [...orders];
      newOrders.splice(index, 1);
      setOrders(newOrders);
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };
  

  const handleStatusChange = async (e, orderIndex, statusType) => {
    e.stopPropagation();
    const newAcceptedOrders = [...acceptedOrders];
    newAcceptedOrders[orderIndex].status[statusType] = !newAcceptedOrders[orderIndex].status[statusType];
    
    try {
      await axios.put(`/orders/status/${newAcceptedOrders[orderIndex]._id}`, {
        status: newAcceptedOrders[orderIndex].status,
      });
      setAcceptedOrders(newAcceptedOrders);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  

  const handleCompleteOrder = (index) => {
    const newAcceptedOrders = [...acceptedOrders];
    newAcceptedOrders[index].completed = true;
    setAcceptedOrders(newAcceptedOrders);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US'); // Format as 'MM/DD/YYYY'
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); // Format as 'HH:MM AM/PM'
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="orders-container">
      <div className="half">
        <div className="incoming-orders">
          <h2>Incoming Orders</h2>
          {orders.map((order, index) => (
            <div
              key={order.id}
              className={`cardorder ${order.expanded ? 'expanded' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-header">
                <div>
                  <strong>{order.userId}</strong>
                  <div>{formatDateTime(order.createdAt)}</div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - {item.quantity} x {item.price}
                    </li>
                  ))}
                </ul>
                <strong>{order.totalAmount}</strong>
                <div>
                  <button className="accept-btn" onClick={(e) => { e.stopPropagation(); handleAccept(index); }}>
                    Accept
                  </button>
                  <button className="reject-btn" onClick={(e) => { e.stopPropagation(); handleReject(index); }}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="half">
        <div className="accepted-orders">
          <h2>Accepted Orders</h2>
          {acceptedOrders.map((order, index) => (
            <div
              key={order.id}
              className={`cardorder ${order.expanded ? 'expanded' : ''} ${order.completed ? 'order-completed' : ''}`}
              onClick={(e) => {
                if (!e.target.type) {
                  const newAcceptedOrders = [...acceptedOrders];
                  newAcceptedOrders[index].expanded = !newAcceptedOrders[index].expanded;
                  setAcceptedOrders(newAcceptedOrders);
                }
              }}
            >
              <div className="card-header">
                <div>
                  <strong>{order.userId}</strong>
                  <div>{formatDateTime(order.createdAt)}</div>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
                {!order.completed && (
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={order.status.packed}
                        onChange={(e) => handleStatusChange(e, index, 'packed')}
                      />
                      Packed
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={order.status.sent}
                        onChange={(e) => handleStatusChange(e, index, 'sent')}
                      />
                      Sent for delivery
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={order.status.delivered}
                        onChange={(e) => handleStatusChange(e, index, 'delivered')}
                      />
                      Delivered
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={order.status.payment}
                        onChange={(e) => handleStatusChange(e, index, 'payment')}
                      />
                      Payment
                    </label>
                    {order.status.packed && order.status.sent && order.status.delivered && order.status.payment && (
                      <button className="complete-btn" onClick={() => handleCompleteOrder(index)}>
                        Complete
                      </button>
                    )}
                  </div>
                )}
                {order.completed && <div className="order-completed">Order Completed</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
