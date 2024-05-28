// Menu.js
import React, { useState } from "react";
import { Drawer } from "antd";
import MenuItem from "./MenuItem";
import menuData from "./menuData";

const Menu = ({ onAddToOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <div className="flex border-4 border-[#00a650] shadow-xl rounded-xl">
      <div className="w-1/4 p-4">
        <h2 className="font-gamb md:flex hidden text-xl md:text-5xl font-semibold text-center text-[#00a550]">
          Menu
        </h2>
        <div className="hidden md:flex flex-col border-r-4 border-dotted border-[#00a650]">
          {Object.keys(menuData).map((category) => (
            <div
              key={category}
              className={`cursor-pointer transition-transform hover:scale-95 px-3 rounded-xl mr-5 ${
                selectedCategory === category ? "bg-[#00a650] text-white" : ""
              }`}
              onClick={() => {
                handleCategoryClick(category);
                onClose(); // Close the drawer after clicking a category
              }}
            >
              <h3 className="font-gamb md:text-2xl font-semibold py-2">
                {category}
              </h3>
            </div>
          ))}
        </div>
        <button
          className="toggle-button md:hidden font-gamb w-fit transition-transform hover:scale-95 md:text-md font-medium text-center text-white p-2 md:p-5 rounded-xl bg-[#00a550]"
          onClick={showDrawer}
        >
          Menu
        </button>
      </div>
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
      >
        {Object.keys(menuData).map((category) => (
          <div
            key={category}
            className={`cursor-pointer transition-transform hover:scale-95 px-3 rounded-xl mr-5 ${
              selectedCategory === category ? "bg-[#00a650] text-white" : ""
            }`}
            onClick={() => {
              handleCategoryClick(category);
              onClose(); // Close the drawer after clicking a category
            }}
          >
            <h3 className="font-gamb md:text-2xl font-semibold py-2">
              {category}
            </h3>
          </div>
        ))}
      </Drawer>
      <div className="w-3/4 p-4">
        {selectedCategory && (
          <div>
            <h3 className="font-gamb md:text-2xl font-semibold text-[#00a650] py-2">
              {selectedCategory}
            </h3>
            {selectedCategory === "Pizza" && (
              <div>
                <h4 className="font-gamb text-base bg-[#00a650] p-2 md:text-xl font-normal text-center hover:scale-95 transition-transform rounded-md text-[#fff] py-2">
                  Small
                </h4>
                <div className="grid grid-cols-2 grid-flow-row-dense">
                  {menuData[selectedCategory].small.map((item, index) => (
                    <MenuItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      onAddToOrder={onAddToOrder}
                    />
                  ))}
                </div>
                <h4 className="font-gamb text-lg bg-[#00a650] p-2 md:text-xl font-normal text-center hover:scale-95 transition-transform rounded-md text-[#fff] py-2">
                  Medium
                </h4>
                <div className="grid grid-cols-2 grid-flow-row-dense">
                  {menuData[selectedCategory].medium.map((item, index) => (
                    <MenuItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      onAddToOrder={onAddToOrder}
                    />
                  ))}
                </div>
                <h4 className="font-gamb text-lg bg-[#00a650] p-2 md:text-xl font-normal text-center hover:scale-95 transition-transform rounded-md text-[#fff] py-2">
                  Large
                </h4>
                <div className="grid grid-cols-2 grid-flow-row-dense">
                  {menuData[selectedCategory].large.map((item, index) => (
                    <MenuItem
                      key={index}
                      name={item.name}
                      price={item.price}
                      onAddToOrder={onAddToOrder}
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedCategory === "Deals" && (
              <div className="grid md:grid-cols-3 sm:grid-cols-2 p-2 grid-cols-1 grid-flow-row-dense">
                {menuData[selectedCategory].map((deal, index) => (
                  <div key={index} className="mb-4 p-4 border border-[#00a650] rounded-lg">
                    <h4 className="font-gamb text-lg font-semibold text-[#00a650]">
                      {deal.name} - {deal.price} PKR
                    </h4>
                    <ul className="list-disc pl-5">
                      {deal.items.map((item, idx) => (
                        <li key={idx} className="font-gamb text-base text-[#333]">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-2 bg-[#00a650] text-white px-4 py-2 rounded hover:bg-[#007a40] transition"
                      onClick={() => onAddToOrder(deal)}
                    >
                      Add to Order
                    </button>
                  </div>
                ))}
              </div>
            )}
            {selectedCategory !== "Pizza" && selectedCategory !== "Deals" && (
              <div className="grid grid-cols-2 grid-flow-row-dense">
                {menuData[selectedCategory].map((item, index) => (
                  <MenuItem
                    key={index}
                    name={item.name}
                    price={item.price}
                    onAddToOrder={onAddToOrder}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
