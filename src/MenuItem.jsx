import React from "react";

const MenuItem = ({ name, price, onAddToOrder }) => {
  const handleAddToOrderClick = () => {
    // Call onAddToOrder with item and quantity
    onAddToOrder({ name, price, quantity: 1 }); // Initial quantity is set to 1
  };

  return (
    <>
      <div className="gap-2 flex flex-row  py-2 items-center justify-center">
        <button
          className="p-2 text-[#00a651] border-2 w-11/12 font-gamb font-medium text-sm md:text-lg lg:text-xl rounded-md hover:scale-95 transition-transform border-[#00a550]"
          onClick={handleAddToOrderClick}
        >
          {name} - Rs.{price}/-
        </button>
      </div>
    </>
  );
};

export default MenuItem;
