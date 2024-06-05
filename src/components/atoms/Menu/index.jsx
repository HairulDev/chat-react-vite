import React from "react";

function MenuItem({ url, children }) {
  return (
    <a href={url} className="text-base font-medium leading-6 text-slate-900">
      {children}
    </a>
  );
}

function Menu({ menuItems }) {
  return (
    <div className="flex gap-10 justify-between my-auto">
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} url={menuItem.url}>
          {menuItem.label}
        </MenuItem>
      ))}
    </div>
  );
}

export default Menu;
