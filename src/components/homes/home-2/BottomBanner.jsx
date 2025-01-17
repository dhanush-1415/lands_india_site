import React from "react";
import Agent from '../../../../public/agent.webp';
import Banner from '../../../../public/background.webp';


export default function BottomBanner() {
    return (
        <>
            <section className="flat-section bg-primary-new flat-testimonial" style={{ background: '#ffffff' }}>
                <style>
                    {`
                        .custom-insider{
                            position:absolute,
                        }
                        .custom-mobile-viewer{
                            width: 80%,
                        }

                        @media (max-width: 1050px) {
                            .custom-desktop-view , .custom-mobile-viewer{
                                display:none;
                            }
                            
                            .custom-insider{
                                position: relative;
                                background: rgb(0,143,247);
                                padding:20px;
                            }
                        }
                        @media (min-width: 1051px) {
                            .custom-mobile-view{
                                display:none;
                            }
                        }
                        @media (max-width: 700px) {
                            .custom-mobile-viewer{
                                display:none;
                                width:100%;
                            }
                            .custom-insider{
                                position: relative;
                                background: rgb(0,143,247);
                                padding:20px;
                            }
                        }
                    `}
                </style>
                {/* <img
                            src="http://luxcycs.com:4400/uploads/banner.png"
                            alt="Background"
                            width="90%"
                            style={{ display: 'block', margin: 'auto' }}
                        /> */}
                <div className="custom-desktop-view" style={{ width: '80%', margin: '20px auto', position: 'relative' }}>
                    <div className="custom-empty" style={{ position: 'relative', width: '100%' }}>
                        <img
                            src={Banner}
                            alt="Background"
                            width="100%"
                            style={{ display: 'block' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgb(0,143,247, 0.6)',
                                zIndex: 1,
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 50,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 2,
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#ffffff', width: '28%', textAlign: 'left', fontWeight: 'bold' }}>Are you selling or renting your property ?</h2>
                        <p style={{ fontSize: '1rem', marginBottom: '20px' }}>
                            Thousands of luxury homes enthusiasts just like you visit our website
                        </p>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '1rem',
                                color: '#000000',
                                backgroundColor: '#ffffff',
                                border: 'none',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => (window.location.href = "/support")}
                        >
                            Reach our support team
                        </button>
                    </div>
                    <img
                        src={Agent}
                        alt="Overlay"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '30%',
                            height: '115%',
                            zIndex: 2,
                        }}
                    />
                </div>

                <div className="custom-mobile-view" style={{ margin: '20px auto', position: 'relative' }}>
                    <div className="custom-mobile-viewer" style={{ position: 'relative', width: '100%' }}>
                        <img
                            src={Banner}
                            alt="Background"
                            width="100%"
                            style={{ display: 'block' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgb(0,143,247, 0.6)',
                                zIndex: 1,
                            }}
                        ></div>
                    </div>
                    <div
                        className="custom-insider"
                        style={{
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            zIndex: 2,
                            textAlign: 'center',
                        }}
                    >
                        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px', color: '#ffffff', fontWeight: 'bold' }}>Are you selling or renting your property ?</h2>
                        <p style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '20px' }}>
                            Thousands of luxury homes enthusiasts just like you visit our website
                        </p>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '1rem',
                                color: '#000000',
                                backgroundColor: '#ffffff',
                                border: 'none',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => (window.location.href = "/support")}
                        >
                            Reach our support team
                        </button>
                    </div>
                </div>

            </section>
        </>
    );
}
