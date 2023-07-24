import React, { useState } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";

let Dropdown = (props) => {
  let dropdown = props.dropdown;
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu1 clicked" : "dropdown-menu1"}
      >
        {dropdown.map((item, index) => {
          return (
            <li key={index} className="hover:bg-blue-500">
              <Link className={item.cName} to={item.path}>
                {" "}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
