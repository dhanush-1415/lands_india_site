import Description from "./Description";
import Overview from "./Overview";
import Video from "./Video";
import Details from "./Details";
import Features from "./Features";
import MapLocation from "./MapLocation";
import FloorPlan from "./FloorPlan";
import AttachMents from "./AttachMents";
import Explore from "./Explore";
import LoanCalculator from "./LoanCalculator";
import Nearby from "./Nearby";
import GuestReview from "./GuestReview";
import ContactSeller from "./ContactSeller";
import WidgetBox from "./WidgetBox";
import WhyChoose from "./WhyChoose";
import LeatestProperties from "./LeatestProperties";
export default function PropertyDetails({data}) {
  
const menuId = data[0]?.main_menuId


  return (
    <>
      <section className="flat-section-v3 flat-property-detail" style={{background:'#f0f3f4'}}>
        <style>
          {`
            .custom-cont-full{
              width:89%;
              margin:0px auto;
            }
          `}
        </style>
        <div  className="custom-cont-full" style={{ width:'89% !important', margin:'0px auto'}} >
          <div className="row">
            <div className="col-xl-8 col-lg-6" style={{background:'#ffffff',padding:'30px'}}>
              <div className="single-property-element single-property-desc">
                <Description data={data} />
              </div>
              {menuId == 1 && <div className="single-property-element single-property-overview">
                <Overview data={data} />
              </div>}
              {/* <div className="single-property-element single-property-video">
                <Video />
              </div> */}
              <div className="single-property-element single-property-info">
                <Details data={data} menuId={menuId}/>
              </div>
              {/* <div className="single-property-element single-property-feature">
                <Features />
              </div>
              <div className="single-property-element single-property-map">
                <MapLocation />
              </div>
              <div className="single-property-element single-property-floor">
                <FloorPlan />
              </div>
              <div className="single-property-element single-property-attachments">
                <AttachMents />
              </div>
              <div className="single-property-element single-property-explore">
                <Explore />
              </div>
              <div className="single-property-element single-property-loan">
                <LoanCalculator />
              </div>
              <div className="single-property-element single-property-nearby">
                <Nearby />
              </div>
              <div className="single-property-element single-wrapper-review">
                <GuestReview />
              </div> */}
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="single-sidebar fixed-sidebar" style={{background:'#ffffff'}} >
                <div className="widget-box single-property-contact" style={{borderRadius:'0px'}}>
                  <ContactSeller data={data} />
                </div>
                {/* <div className="flat-tab flat-tab-form widget-filter-search widget-box">
                  <WidgetBox />
                </div> */}
                {/* <div className="widget-box single-property-whychoose">
                  <WhyChoose />
                </div>
                <div className="box-latest-property">
                  <LeatestProperties />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
