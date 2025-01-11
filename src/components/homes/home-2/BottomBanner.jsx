import React from "react";

export default function BottomBanner() {
    return (
        <>
            <section className="flat-section bg-primary-new flat-testimonial" style={{background:'#ffffff'}}>
                <div style={{ width: '80%', margin: '20px auto', position: 'relative' }}>
                    {/* First Image with Blue Overlay */}
                    <div style={{ position: 'relative', width: '100%' }}>
                        <img
                            src="https://protywpv1.live.vithemes.com/wp-content/uploads/2024/11/ds.webp"
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
                                backgroundColor: 'rgba(21,99,223, 0.3)',
                                zIndex: 1,
                            }}
                        ></div>
                    </div>
                    {/* Centered Text and Button */}
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
                        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color:'#ffffff' }}>Are you selling or renting your property ?</h2>
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
                                fontWeight:'bold',
                                borderRadius: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            Reach our support team
                        </button>
                    </div>
                    {/* Second Image */}
                    <img
                        src="https://protywpv1.live.vithemes.com/wp-content/uploads/2024/11/agent.webp"
                        alt="Overlay"
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '30%',
                            height: '115%',
                            zIndex:2,
                        }}
                    />
                </div>
            </section>
        </>
    );
}
