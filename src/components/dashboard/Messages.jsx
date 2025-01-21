import React, { useState, useEffect } from "react";

import { messages } from "@/data/dashboard";
import { getUserQueries } from "@/apiCalls";

export default function Messages() {

  const [quries, setQuries] = useState([]);

  const fetchEnquires = async () => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {
      try {
        const data = await getUserQueries(landsUser.id);
        if (data.success) {
          setQuries(data.data)
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
  };

  useEffect(() => {
    fetchEnquires();
  }, []);

  return (
    <div className="main-content">
      <style>{`
        @media (min-width: 800px) {
          .custom-header-text {
            display: none;
          }
        }
        @media (max-width: 798px) {
          .main-content{
            width: 100%
          }
        }
      `}</style>
      <div className="main-content-inner">
        <div className="button-show-hide show-mb custom-header-text">
          <span className="body-1">Show Menu</span>
        </div>
        <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
          <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>Property Enquires</h3>
        </div>
        <div className="widget-box-2 mess-box">
          {/* <h5 className="title">Enquires</h5> */}
          <ul className="list-mess">
            {quries.length && quries.map((msg, index) => (
              <li className="mess-item" key={index}>
                <div className="user-box">

                  <div className="content">
                    <div className="name fw-6">{msg.name}</div>
                    <span className="caption-2 text-variant-3">
                      {msg.createdAt?.split('T')[0] || ""}
                    </span>
                  </div>
                </div>
                <p>{msg.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-dashboard footer-dashboard-2">
        <p>Copyright © 2024 LandsIndia</p>
      </div>
    </div>
  );
}
