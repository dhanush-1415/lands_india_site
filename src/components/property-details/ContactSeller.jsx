import React from "react";
import AttachEmailSharpIcon from '@mui/icons-material/AttachEmailSharp';
import CallIcon from '@mui/icons-material/Call';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

export default function ContactSeller() {
  return (
    <>
      {" "}
      {/* <h5 className="title fw-6">Contact Sellers</h5> */}
      <h5 className="fw-6">Posted By</h5>
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
      src="profile-pic.jpg"
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
      John Doe
    </div>
    <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>+1 (123) 456-7890</div>
  </div>
</div>

        <div className="ip-group" style={{display: 'flex', justifyContent: 'space-between', marginTop: '18px'}}>
          {/* <input
            type="text"
            placeholder="Phone"
            className="form-control"
          /> */}
          <div className="d-flex gap-8 align-items-center" style={{ fontWeight: 'bold', background: '#018df7', color: '#ffffff', padding: '4px 10px', width: '50%' }}>
                                                      <AttachEmailSharpIcon sx={{ padding: '0px 2px' }} /><span > Enquiry Now </span>
                                                    </div>
                                                  <div className="" style={{display: 'flex'}}>
                                                    <div className="" style={{ padding: '3px', border: '1px solid black', borderRadius: '50%', marginRight: '10px' }}>
                                                      <CallIcon />
                                                    </div>
                                                    <div className="" style={{ padding: '3px', border: '1px solid black', borderRadius: '50%' }}>
                                                      <PermPhoneMsgIcon />
                                                    </div>
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
