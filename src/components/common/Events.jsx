import { agents } from "@/data/agents";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { getEventsList } from "@/apiCalls";
import DropdownSelect from "./DropdownSelect";

import Pagination from "./Pagination";
import Footer2 from "../footer/Footer2";
import { Upcoming } from "@mui/icons-material";
export default function Events() {



    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [sorted, setSorted] = useState();
    const [itemPerPage, setItemPerPage] = useState(9);
    const [activeTab, setActiveTab] = useState('upcoming'); // State for active tab


    console.log(data, "ppppppppppppppppppp")

    const fetchAgents = async () => {
        const flag = activeTab === 'upcoming' ? true : false;
        try {
            const data = await getEventsList(flag);
            if (data.success) {
                setData(data.data);
            } else {
                toast.error(data.message);
                setData()
            }
        } catch (err) {
            setData()
            console.error('Error fetching categories:', err);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [activeTab]);

    return (
        <>
            <section className="flat-section flat-agents" style={{ paddingTop: '0px' }}>
                <style>{`
                .tabs-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                }

                .tab {
                    padding: 10px 20px;
                    border: 2px solid #008ff7;
                    border-radius: 0px;
                    font-size: 16px;
                    font-weight: 500;
                    color: #008ff7;
                    background-color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    min-width: 150px;
                }

                .tab.active {
                    background-color: #008ff7;
                    color: white;
                    border-color: #008ff7;
                    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2);
                }

                .tab:hover {
                    background-color: #008ff7;
                    color: white;
                    border-color: #008ff7;
                }

                @media (max-width: 768px) {
                    .tabs-container {
                    flex-direction: column;
                    gap: 10px;
                    }

                    .tab {
                    width: 80%;
                    }
                }
                `}</style>
                <div style={{ background: '#f0f3f4', padding: '20px 0' }}>
                    <div style={{ width: '80%', margin: '50px auto' }}>
                        <h4>Events</h4>
                    </div>
                </div>
                <div className="tabs-container" style={{padding:'30px 0'}}>
                    <div
                        className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming Events
                    </div>
                    <div
                        className={`tab ${activeTab === 'past' ? 'active' : ''}`}
                        onClick={() => setActiveTab('past')}
                    >
                        Past Events
                    </div>
                </div>
                {activeTab === 'upcoming' ? (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
                                <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
                                    {data?.length && data.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                <img src={event.images[0]} alt="sin" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                                <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
                            </div>
                        </div>

                        {/* <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                            <Pagination
                                currentPage={currentPage}
                                setPage={setCurrentPage}
                                itemLength={sorted?.length}
                                itemPerPage={itemPerPage}
                            />
                        </ul> */}
                    </>
                ) : (
                    <>
                        <div className="container custom-container-header" style={{ padding: '30px 0 40px' }}>
                            <div className="swiper tf-sw-mobile-1 non-swiper-on-575" style={{ overflow: 'visible', padding: '0px 20px' }}>
                                <div className="tf-layout-mobile-sm xl-col-4 sm-col-2 swiper-wrapper">
                                    {data?.length && data.map((event) => (
                                        <SwiperSlide key={event.id} className="swiper-slide">
                                            <div
                                                className="box-agent hover-img wow fadeInUp"
                                                style={{ animationDelay: event.wowDelay, boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", borderRadius: '3px' }} // WOW.js animation delay
                                            >
                                                <img src={event.images[0]} alt="sin" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                                <div className="sw-pagination spb3 sw-pagination-mb-1 text-center d-sm-none d-block" />
                            </div>
                        </div>
{/* 
                        <ul className="wd-navigation mt-20" style={{ justifyContent: 'center' }} >
                            <Pagination
                                currentPage={currentPage}
                                setPage={setCurrentPage}
                                itemLength={sorted?.length}
                                itemPerPage={itemPerPage}
                            />
                        </ul> */}
                    </>
                )}
            </section>
            <Footer2 />
        </>
    );
}
