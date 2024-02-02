import React, { useState } from "react";
import Customer from "./Customer";
import Menu from "./Menu";
import OrderSummary from "./OrderSummary";
import "antd"
function App() {
  const [orders, setOrders] = useState([]);
  const [customerData, setCustomerData] = useState({});

  const handleAddToOrder = (item) => {
    // Check if the item already exists in the order
    const existingItemIndex = orders.findIndex((orderItem) => orderItem.name === item.name);

    if (existingItemIndex !== -1) {
      // Item already exists, increase its quantity
      const updatedOrders = [...orders];
      updatedOrders[existingItemIndex].quantity += 1;
      setOrders(updatedOrders);
    } else {
      // Item doesn't exist, add it to the order
      setOrders((prevOrders) => [
        ...prevOrders,
        {
          name: item.name,
          price: item.price,
          quantity: 1, // Initial quantity is 1
        },
      ]);
    }
  };


  const handleCustomerDataChange = (data) => {
    setCustomerData(data);
  };

  const handleNewOrder = () => {
    setOrders([]); // Clear the current order
    setCustomerData({}); // Clear customer data (optional, based on your requirements)
  };

  return (
    <>
      
      <div className="flex flex-col gap-5 p-5">
      <div className="bg-fixed bg-[url('./RIDER_LOGO.jpg')] animate-spin h-screen bg-no-repeat bg-center bg-contain"></div>
        <Menu onAddToOrder={handleAddToOrder} />
        <Customer onCustomerDataChange={handleCustomerDataChange} />
        <OrderSummary
          orders={orders}
          setOrders={setOrders}
          customerData={customerData}
          onNewOrder={handleNewOrder}
        />
      </div>
    </>
  );
}

export default App;
