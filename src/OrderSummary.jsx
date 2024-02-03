import React, { useEffect, useState } from "react";

import { HiMinusCircle, HiPlusCircle, HiTrash } from "react-icons/hi";

const OrderSummary = ({ orders, setOrders, customerData, onNewOrder }) => {
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [includeDeliveryCharges, setIncludeDeliveryCharges] = useState(false);

  const onDeleteItem = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  useEffect(() => {
    const subtotal = calculateSubtotal();
    const tax = parseFloat(calculateTax());
    const deliveryChargesValue = includeDeliveryCharges ? 200 : 0;
    const grandTotal = subtotal + tax + deliveryChargesValue;

    // Store order summary in local storage
    localStorage.setItem(
      "orderSummary",
      JSON.stringify({
        orders,
        customerData,
        deliveryCharges: deliveryChargesValue,
        subtotal,
        tax,
        grandTotal,
      })
    );
  }, [orders, includeDeliveryCharges, customerData]);

  const calculateSubtotal = () => {
    return orders.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * 0.16).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = parseFloat(calculateTax());
    const total = subtotal + tax + (includeDeliveryCharges ? 200 : 0);
    return total.toFixed(2);
  };

  const handleCheckboxChange = () => {
    setIncludeDeliveryCharges(!includeDeliveryCharges);
  };

  const onIncreaseQuantity = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].quantity += 1;
    setOrders(updatedOrders);
  };

  const onDecreaseQuantity = (index) => {
    const updatedOrders = [...orders];
    if (updatedOrders[index].quantity > 1) {
      updatedOrders[index].quantity -= 1;
    } else {
      // If quantity is 1, remove the item
      updatedOrders.splice(index, 1);
    }
    setOrders(updatedOrders);
  };
  const handlePrintOrderSummary = () => {
    // Get the current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Exclude delivery charges checkbox from the printed content
    const tableContent = document.getElementById("orderSummaryTable").outerHTML;
    const customer = document.getElementById("customer").outerHTML;

    const contentToPrint = customer + tableContent;

    // Open a new window
    const newWindow = window.open();

    // Write the HTML content with a 2x2 grid layout
    newWindow.document.write(`
      <html>
        <head>
          <title>Order Summary</title>
          <style>
          @media print {
            .actions-column {
             display: none;
             visible: none;
            }

            body {
              margin: 0;
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: repeat(1, 4fr);
            }
            
            table {
              font-size: small;
              width: 100%;
            }
            
            th, td {
              padding: 1px;
              border: 1px solid #00a550;
            }
  
            .print-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: start;
              height: 100%;
              font-size:small;
              padding-left:5px;
              margin-left:5px;
              margin-right:5px;
              padding-right:5px;
            }
          }
          </style></head>
        <body>
          <div style="border-right: 1px dashed #00a550; margin-right:1px;" class="print-content">
              <img style="height:45px;"  src="./snpLogo.jpeg" alt="logo"/>
              <h7>ORDER TAKER</h7>
              ${contentToPrint}
              <p>Date: ${currentDate} | Time: ${currentTime}</p>
          </div>
          <div style="border-right: 1px dashed #00a550; padding-left:1px;" class="print-content">
            <img style="height:45px;"  src="./snpLogo.jpeg" alt="logo"/>
            <h7>CASHIER</h7>
            ${contentToPrint}
            <p>Date: ${currentDate} | Time: ${currentTime}</p>
          </div>
          <div style="border-right: 1px dashed #00a550;" class="print-content">
            <img style="height:45px;"  src="./snpLogo.jpeg" alt="logo"/>
            <h7>CUSTOMER</h7>
            ${contentToPrint}
            <p>Date: ${currentDate} | Time: ${currentTime}</p>
          </div>
          <div style="border-right: 1px dashed #00a550; " class="print-content">
            <img style="height:45px;"  src="./snpLogo.jpeg" alt="logo"/>
            <h7>KITCHEN</h7>
            ${contentToPrint}
            <p>Date: ${currentDate} | Time: ${currentTime}</p>
          </div>
        </body>
      </html>
    `);

    newWindow.addEventListener("load", () => {
      newWindow.print();
    });
    newWindow.document.close();
  };

  return (
    <div className="border-2 p-2 shadow-2xl border-dashed border-[#00a355]">
      <h2 className="font-gamb mb-4 text-xl md:text-5xl font-semibold text-center text-[#00a550]">
        Order Summary
      </h2>
      <div id="customer" className="flex flex-col gap-2 p-2">
        <h3 className="font-gamb text-lg md:text-2xl font-medium  text-[#00a550]">
          Customer Information
        </h3>
        <p className="text-[#00a550] flex flex-row gap-2 text-md font-sans font-semibold">
          {customerData.customerName} || {customerData.customerPhoneNumber} || {customerData.paymentOption}
        </p>
        <p className="text-[#00a550] text-md font-sans font-semibold">
          {customerData.customerAddress}
        </p>
      </div>
      <label className="text-md font-sans font-semibold">
        Include Delivery Charges:
        <input
          className="accent-[#00a650] ml-2"
          type="checkbox"
          checked={includeDeliveryCharges}
          onChange={handleCheckboxChange}
        />
      </label>
      <div className="flex justify-center items-center">
        <table
          id="orderSummaryTable"
          className="w-1/2 justify-center rounded-3xl shadow-2xl border-collapse"
        >
          <thead>
            <tr className="font-gamb md:text-xl">
              <th className="border-4 border-[#00a650]  p-2">Item</th>
              <th className="border-4 border-[#00a650] p-2">Price</th>
              <th className="border-4 border-[#00a650] p-2">Quantity</th>
              <th className="border-4 actions-column border-[#00a650] p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem, index) => (
              <tr key={index} className="">
                <td className="border-4 font-serif border-[#00a650] md:p-2 p-1">
                  {orderItem.name}
                </td>
                <td className="border-4 font-serif  text-end border-[#00a650] md:p-2 p-1">
                  Rs.{orderItem.price}/-
                </td>
                <td className="border-4 font-serif  text-end border-[#00a650] md:p-2 p-1">
                  {orderItem.quantity}/-
                </td>
                <td className="border-4 actions-column text-center border-[#00a650] md:p-2 p-1">
                  <button
                    className="text-green-600 p-2 hover:scale-95 transition-transform md:text-2xl"
                    onClick={() => onIncreaseQuantity(index)}
                  >
                    <HiPlusCircle />
                  </button>
                  <button
                    className="text-red-600 p-2 hover:scale-95 transition-transform md:text-2xl"
                    onClick={() => onDecreaseQuantity(index)}
                  >
                    <HiMinusCircle />
                  </button>
                  <button
                    className="text-red-600 p-2 hover:scale-95 transition-transform md:text-2xl"
                    onClick={() => onDeleteItem(index)}
                  >
                    <HiTrash />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td
                className="border-4 border-[#00a355] text-end p-2"
                colSpan="4"
              >
                <div> Subtotal: Rs. {calculateSubtotal()}/- </div>
                <div> Tax (16%): Rs. {calculateTax()}/-</div>
                <div>
                  Delivery Charges: Rs. {includeDeliveryCharges ? 200 : 0}/-
                </div>
              </td>
            </tr>
            <tr>
              <td
                className="border-4 border-[#00a355] text-end p-2"
                colSpan="4"
              >
                <div>
                  <p className="text-[#00a355] font-gamb text-lg md:text-3xl">
                    Total: Rs. {calculateTotal()}/-{" "}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between m-2 gap-2 p-2 items-center">
        <button
          className="bg-[#00a550] text-[#fff] font-semibold transition-transform hover:scale-95 w-full md:text-lg rounded-xl font-gamb md:p-3 p-1"
          onClick={handlePrintOrderSummary}
        >
          Print Order Summary
        </button>
        <button
          className="bg-[#00a550]  text-[#fff] font-semibold transition-transform hover:scale-95 w-full text-lg rounded-xl font-gamb p-3 md:text-2xl"
          onClick={onNewOrder}
        >
          New Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
