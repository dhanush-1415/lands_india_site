import FilterTab from "@/components/common/FilterTab";
import FlatFilter2 from "@/components/common/FlatFilter2";
import WordEffect1 from "@/components/common/WordEffect1";

export default function Hero() {
  return (
    <div className="home-splitter">
      <section className="flat-slider home-1 home-sp-one">
        <div className="container relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="slider-content custom-slider-cont">
                <div className="custom-home-header">
                  <span className="custom-span-header">Find Real Properties at the <br/> Best Prices on PropertyStore</span>
                </div>
                {/* <div className="heading text-center">
                <div className="title-large text-white animationtext slide">
                  Find Your{" "}
                  <WordEffect1 string={["Dream Home", "Perfect Home"]} />
                </div>
                <p
                  className="subtitle text-white body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  We are a real estate agency that will help you find the best
                  residence you dream of, let’s discuss for your dream house?
                </p>
              </div> */}
                <FilterTab />
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" />
      </section>
      <section className="flat-slider home-1 home-sp-two">
        <div className="container relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="slider-content">
                <div className="heading text-center">
                <div className="title-large text-white animationtext slide">
                  Find Your{" "}
                  <WordEffect1 string={["Dream Home", "Perfect Home"]} />
                </div>
             
              </div>
                {/* <FilterTab /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" />
      </section>
    </div>
  );
}
