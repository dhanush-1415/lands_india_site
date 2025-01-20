import React, { useState } from "react";
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import CallIcon from '@mui/icons-material/Call';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';
import EnquiryForm from "../common/Enquiry";

export default function ContactSeller() {



  const [open, setOpen] = useState(false);

  const [propertyId, setPropertyId] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(true);
    setPropertyId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setPropertyId(null);
  };


  return (

    <>
      {" "}
      <EnquiryForm open={open} handleClose={handleClose} id={propertyId} />
      {/* <h5 className="title fw-6">Contact Sellers</h5> */}
      <h5 className="fw-6">Posted By: Owner</h5>
      {/* <div className="box-avatar">
        <div className="avatar avt-100 round">
          <img
            alt="avatar"
            src="/images/avatar/avt-lg-single.jpg"
            width={100}
            height={100}
          />
        </div>
        <div className="info">
          <h6 className="name">Shara Conner</h6>
          <ul className="list">
            <li className="d-flex align-items-center gap-4 text-variant-1">
              <i className="icon icon-phone" />
              1-333-345-6868
            </li>
            <li className="d-flex align-items-center gap-4 text-variant-1">
              <i className="icon icon-mail" />
              themesflat@gmail.com
            </li>
          </ul>
        </div>
      </div> */}
      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="ip-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Profile Picture */}
          <div style={{ flexShrink: 0 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              // alt="Profile Picture"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Name and Phone Number */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              J*** **e
            </div>
            <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>+91 91******90</div>
          </div>
        </div>

        <div className="content-bottom mt-3 d-flex flex-lg-row justify-content-between">
          <div
            className="d-flex justify-content-center align-items-center shadow-sm"
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              background: '#018df7',
              color: '#ffffff',
              padding: '10px 10px',
              borderRadius: '0px',
              textAlign: 'center',
            }}
            onClick={() => { handleClickOpen(elm.id) }}
          >
            <DraftsTwoToneIcon sx={{ marginRight: '5px' }} />
            <span>Enquiry Now</span>
          </div>
          <div
            className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
            style={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              background: '#ffffff',
            }}
            onClick={() => window.location.href = 'tel:+919363828393'}
          >
            <CallIcon sx={{ color: '#018df7' }} />

          </div>
          <div
            onClick={() => window.open('https://wa.me/919363828393?text=Hi, I would like to know more.', '_blank')}
            className="d-flex justify-content-center align-items-center rounded-circle border shadow-sm"
            style={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              background: '#ffffff',
            }}
          >
            <WhatsAppIcon sx={{ color: '#25D366' }} />
          </div>
        </div>
        {/* <div className="ip-group">
          <input
            type="text"
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="ip-group">
          <textarea
            id="comment-message"
            name="message"
            rows={4}
            tabIndex={4}
            placeholder="Message"
            aria-required="true"
            defaultValue={""}
          />
        </div> */}
        {/* <button
          type="submit"
          className="tf-btn btn-view primary hover-btn-view w-100"
        >
          Find Properties
          <span className="icon icon-arrow-right2" />
        </button> */}
        {/* <button
          type="submit"
          className="tf-btn btn-view primary hover-btn-view w-100"
        >
          Submit
          <span className="icon icon-arrow-right2" />
        </button> */}
      </form>
    </>
  );
}
