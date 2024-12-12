import React from "react";
import { Grid } from "@mui/material";

export default function Overview({ additionalInformation }) {
  return (
    <>
      <h6 className="title fw-6">Overview</h6>
      <ul className="info-box">
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-sliders-horizontal" />
              </a>
              <div className="content">
                <span className="label">Type:</span>
                <span>House</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-garage" />
              </a>
              <div className="content">
                <span className="label">Garages:</span>
                <span>1</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-bed1" />
              </a>
              <div className="content">
                <span className="label">Bedrooms:</span>
                <span>{additionalInformation.bhk}</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-bathtub" />
              </a>
              <div className="content">
                <span className="label">Bathrooms:</span>
                <span>2 Rooms</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-crop" />
              </a>
              <div className="content">
                <span className="label">Land Size:</span>
                <span>2,000 SqFt</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-hammer" />
              </a>
              <div className="content">
                <span className="label">Year Built:</span>
                <span>2024</span>
              </div>
            </li>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a href="#" className="box-icon w-52">
                <i className="icon icon-ruler" />
              </a>
              <div className="content">
                <span className="label">Size:</span>
                <span>900 SqFt</span>
              </div>
            </li>
          </Grid> */}

            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-home"></i>
                </a>
                <div className="content">
                  <span className="label">Floors:</span>
                  <span>{additionalInformation.numberOfFloors}</span>
                </div>
              </li>
            </Grid>

            {/* Bathrooms */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-bath"></i>
                </a>
                <div className="content">
                  <span className="label">Bathrooms:</span>
                  <span>{additionalInformation.bathrooms}</span>
                </div>
              </li>
            </Grid>

            {/* Furnished */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                <i class='bx bx-chair' ></i>
                </a>
                <div className="content">
                  <span className="label">Furnished:</span>
                  <span>{additionalInformation.furnished}</span>
                </div>
              </li>
            </Grid>

            {/* Floor Type */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-grid"></i>
                </a>
                <div className="content">
                  <span className="label">Floor Type:</span>
                  <span>{additionalInformation.floorType}</span>
                </div>
              </li>
            </Grid>

            {/* Property Age */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-time"></i>
                </a>
                <div className="content">
                  <span className="label">Property Age:</span>
                  <span>{additionalInformation.propertyAge}</span>
                </div>
              </li>
            </Grid>

            {/* Car Parking */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-car"></i>
                </a>
                <div className="content">
                  <span className="label">Car Parking:</span>
                  <span>{additionalInformation.carParking}</span>
                </div>
              </li>
            </Grid>

            {/* Frontage */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-ruler"></i>
                </a>
                <div className="content">
                  <span className="label">Frontage:</span>
                  <span>{additionalInformation.frontage}</span>
                </div>
              </li>
            </Grid>

            {/* Facing */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-compass"></i>
                </a>
                <div className="content">
                  <span className="label">Facing:</span>
                  <span>{additionalInformation.facing}</span>
                </div>
              </li>
            </Grid>

            {/* EB Connection */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i class='bx bxs-plug' ></i>
                </a>
                <div className="content">
                  <span className="label">EB Connection:</span>
                  <span>{additionalInformation.ebConnection}</span>
                </div>
              </li>
            </Grid>

            {/* Has Solar */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-sun"></i>
                </a>
                <div className="content">
                  <span className="label">Has Solar:</span>
                  <span>{additionalInformation.hasSolar}</span>
                </div>
              </li>
            </Grid>

            {/* Water */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-water"></i>
                </a>
                <div className="content">
                  <span className="label">Water:</span>
                  <span>{additionalInformation.water}</span>
                </div>
              </li>
            </Grid>

            {/* Compound */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i class='bx bx-border-outer'></i>
                </a>
                <div className="content">
                  <span className="label">Compound:</span>
                  <span>{additionalInformation.compound}</span>
                </div>
              </li>
            </Grid>

            {/* Ceiling */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                <i class='bx bx-vertical-top'></i>
                </a>
                <div className="content">
                  <span className="label">Ceiling:</span>
                  <span>{additionalInformation.ceiling}</span>
                </div>
              </li>
            </Grid>

            {/* Rental Income */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                  <i className="bx bx-rupee"></i>
                </a>
                <div className="content">
                  <span className="label">Rental Income:</span>
                  <span>{additionalInformation.rentalIncome}</span>
                </div>
              </li>
            </Grid>

            {/* Road Width */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                <i class='bx bx-reflect-vertical'></i>
                </a>
                <div className="content">
                  <span className="label">Road Width:</span>
                  <span>{additionalInformation.roadWidth}</span>
                </div>
              </li>
            </Grid>

            {/* Garden */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a href="#" className="box-icon w-52">
                <i class='bx bxs-tree'></i>
                </a>
                <div className="content">
                  <span className="label">Garden:</span>
                  <span>{additionalInformation.garden}</span>
                </div>
              </li>
            </Grid>
          </Grid>
      </ul>
    </>
  );
}
