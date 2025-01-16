import React from "react";
import { Grid } from "@mui/material";

export default function Overview({ data }) {
  return (
    <>
      <h5 className="mt-8 fw-6 title">Overview</h5>
      <ul className="info-box">
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6} md={4}>
            <li className="item">
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
              <a className="box-icon w-52">
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
                <a className="box-icon w-52">
                  <i className="bx bx-home"></i>
                </a>
                <div className="content">
                  <span className="label">Floors:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "floors")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Bathrooms */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-bath"></i>
                </a>
                <div className="content">
                  <span className="label">Bathrooms:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "baths")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Furnished */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                <i class='bx bx-chair' ></i>
                </a>
                <div className="content">
                  <span className="label">Furnished:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "furnished")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Floor Type */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-grid"></i>
                </a>
                <div className="content">
                  <span className="label">Floor Type:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "floor")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Property Age */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-time"></i>
                </a>
                <div className="content">
                  <span className="label">Property Age:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "age")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Car Parking */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-car"></i>
                </a>
                <div className="content">
                  <span className="label">Car Parking:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "parking")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Frontage */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-ruler"></i>
                </a>
                <div className="content">
                  <span className="label">Frontage:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "frontage")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Facing */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-compass"></i>
                </a>
                <div className="content">
                  <span className="label">Facing:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "facing")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* EB Connection */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i class='bx bxs-plug' ></i>
                </a>
                <div className="content">
                  <span className="label">EB Connection:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "eb")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Has Solar */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-sun"></i>
                </a>
                <div className="content">
                  <span className="label">Has Solar:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "solar")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Water */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-water"></i>
                </a>
                <div className="content">
                  <span className="label">Water:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "water")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Compound */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i class='bx bx-border-outer'></i>
                </a>
                <div className="content">
                  <span className="label">Compound:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "compound")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Ceiling */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                <i class='bx bx-vertical-top'></i>
                </a>
                <div className="content">
                  <span className="label">Ceiling:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "ceilig")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Rental Income */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                  <i className="bx bx-rupee"></i>
                </a>
                <div className="content">
                  <span className="label">Rental Income:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "income")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Road Width */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                <i class='bx bx-reflect-vertical'></i>
                </a>
                <div className="content">
                  <span className="label">Road Width:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "roadwidth")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>

            {/* Garden */}
            <Grid item xs={12} sm={6} md={4}>
              <li className="item">
                <a className="box-icon w-52">
                <i class='bx bxs-tree'></i>
                </a>
                <div className="content">
                  <span className="label">Garden:</span>
                  <span>{
                      data[0].inputs.find(item => item.input_name === "garden")?.input_value || ""
                    }</span>
                </div>
              </li>
            </Grid>
          </Grid>
      </ul>
    </>
  );
}
