import { rightMenuItems } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";

export default function NavTwo() {
  const { pathname } = useLocation();

  return (
    <>
      {rightMenuItems.map((item, index) => (
        <li
          key={index}
          // className={`dropdown ${
          //   item.links.some(
          //     (el) => el.href.split("/")[1] == pathname.split("/")[1]
          //   )
          //     ? "current"
          //     : ""
          // }`}
        >
          <a href={item.link}>{item.title}</a>
          {/* <ul>
            {item.links.map((link, linkIndex) => (
              <li
                key={linkIndex}
                className={
                  link.href.split("/")[1] == pathname.split("/")[1]
                    ? "current"
                    : ""
                }
              >
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="dropdown2-btn"></div> */}
        </li>
      ))}
    </>
  );
}
