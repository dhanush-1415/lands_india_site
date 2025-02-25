import React, { useState, useEffect } from "react";

import { messages } from "@/data/dashboard";
import { getUserQueries } from "@/apiCalls";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


export default function Messages() {



  const [quries, setQuries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Prevents multiple calls

  const fetchEnquires = async (pageNum) => {
    const landsUser = JSON.parse(localStorage.getItem('LandsUser') || '{}');

    if (landsUser?.id && !loading) {
      setLoading(true);
      try {
        const data = await getUserQueries(landsUser.id, pageNum);
        if (data.success) {
          setQuries((prev) => (pageNum === 1 ? data.data : [...prev, ...data.data]));
          setPage(pageNum + 1);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching queries:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchEnquires(1);
  }, []);

  // Infinite Scroll
  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 5;
    if (bottom && !loading) {
      fetchEnquires(page);
    }
  };



  // const [quries, setQuries] = useState([]);
  // const [page, setPage] = useState(1);

  // const fetchEnquires = async () => {
  //   const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

  //   if (landsUser) {
  //     try {
  //       const data = await getUserQueries(landsUser.id , page);
  //       if (data.success) {
  //         if (data.data.length > 1) {
  //           setQuries((prev) => [...(prev || []), ...data.data]);
  //         } else {
  //           setQuries(data.data)
  //         }
  //         setPage(page + 1);

  //       } else {
  //         toast.error(data.message)
  //       }
  //     } catch (err) {
  //       console.error('Error fetching categories:', err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchEnquires();
  // }, []);


  const handleNav = () => {
    window.location.href = "/add-property"
  }


  // const handleScroll = (event) => {
  //   // fetchProperties();
  //   const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
  //   console.log(bottom, "Scroll Position");

  //   // Allow a small tolerance, e.g., 5px, to trigger loading when close to the bottom
  //   if (bottom || event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 5) {
  //     // if (!loading) {
  //       fetchEnquires();
  //     // }
  //   }
  // };

  return (
    <div className="main-content">
      <style>{`
            .custom-table-body{
          max-height:600px !important;
          overflow:scroll;
          scrollbar-width: none;
        }
        @media (min-width: 800px) {
          .custom-header-text {
            display: none !important;
          }
        }
          .custom-header-text {
            display: flex ;
            justify-content:flex-start;
            align-items: center;
          }
        @media (max-width: 798px) {
      
          .main-content{
            width: 100%
          }
              .custom-bg-dark{
            font-weight:bold;
            background: #008FF7;
            color:#ffffff !important;
            padding: 7px 12px;
            border-radius: 10%;
            border:none;
          }
        }
      `}</style>
      <div className="main-content-inner">
        <div className="d-flex justify-content-between">
          <div className="button-show-hide custom-header-text">
            < ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
            <span className="body-1">Menu</span>
          </div>
          <div className="custom-header-text" onClick={handleNav}>
            <span className="custom-bg-dark">Sell Property</span>
          </div>
        </div>
        <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
          <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>Property Enquires</h3>
        </div>
        <div className="widget-box-2 mess-box">
          {/* <h5 className="title">Enquires</h5> */}
          <ul className="list-mess custom-table-body"
            onScroll={handleScroll}>
            {quries.length >= 1 && quries.map((msg, index) => (
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
