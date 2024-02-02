import React, { useState } from "react";

const Customer = ({ onCustomerDataChange }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [paymentOption, setPaymentOption] = useState("online"); // Default to "online"

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!customerName || !customerAddress || !customerPhoneNumber) {
      alert("Please fill in all the fields");
      return;
    }

    // Pass customer information and payment option to the parent component (App.js)
    onCustomerDataChange({
      customerName,
      customerAddress,
      customerPhoneNumber,
      paymentOption,
    });
  };

  return (
    <div className="border-b-2 border-dashed border-[#00a550]">
      <h2 className="font-gamb mb-4 text-xl md:text-5xl font-semibold text-center text-[#00a550]">
        Customer Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row justify-around gap-2 p-2">
          <label className="flex flex-row items-center w-full md:w-1/2  gap-2">
            <p className="md:text-2xl text-lg font-medium font-gamb">Name:</p>
            <input
              className="border-2 text-[#00a550] rounded-md border-[#00a650] focus:ring-2 focus:ring-[#00a550] outline-none w-1/2 px-2 py-1 "
              type="text"
              value={customerName}
              placeholder="Enter Name...."
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>

          <label className="flex my-2 items-center w-full md:w-1/2 flex-row gap-2">
            <p className="md:text-2xl text-lg whitespace-nowrap  font-medium font-gamb">
              Phone #:
            </p>
            <input
              className="border-2 text-[#00a550] rounded-md border-[#00a650] focus:ring-2 focus:ring-[#00a550] outline-none w-1/2 px-2 py-1 "
              type="text"
              value={customerPhoneNumber}
              placeholder="Enter Phone Number...."
              onChange={(e) => setCustomerPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-2">
          <label className="flex flex-row items-center w-full md:w-1/2  gap-2">
            <p className="md:text-2xl text-lg whitespace-nowrap  font-medium font-gamb">
              Address:
            </p>
            <textarea
              className="border-2 text-[#00a550] rounded-md border-[#00a650] focus:ring-2 focus:ring-[#00a550] outline-none w-full md:w-1/2  px-2 py-1 "
              type="text"
              rows={3}
              value={customerAddress}
              placeholder="Enter Address...."
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </label>

          {/* Payment Options */}
          <div className="flex flex-row gap-2">
            <input
            className="accent-[#00a550]"
              type="radio"
              value="online"
              checked={paymentOption === "online"}
              onChange={() => setPaymentOption("online")}
            />
            <span className="md:text-xl text-sm font-medium font-serif">
              Online Payment
            </span>

            <input
              className="accent-[#00a550]"
              type="radio"
              value="cod"
              checked={paymentOption === "cod"}
              onChange={() => setPaymentOption("cod")}
            />
            <span className="md:text-xl items-center text-sm font-medium font-serif">
              Cash on Delivery (COD)
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#00a550] my-2 text-[#fff] font-semibold transition-transform hover:scale-95 w-full text-lg rounded-xl font-gamb p-3 md:text-3xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Customer;
