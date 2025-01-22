const items = [
  { label: "ID:", content: "#1234" },
  { label: "Beds", content: "7.328" },
  { label: "Price", content: "$7,500" },
  { label: "Year built", content: "2024" },
  { label: "Size", content: "150 sqft" },
  { label: "Type", content: "Villa" },
  { label: "Rooms", content: "9" },
  { label: "Status", content: "For sale" },
  { label: "Baths", content: "3" },
  { label: "Garage", content: "1" },
];

export default function Details({ data, menuId }) {

  // console.log("xxxxxxxxxxxxx", data);

  const filterData = data[0]?.inputs?.filter(el => !(el.input_name == "Title" || el.input_name == "Description" || el.input_name == "Total Sqft" || el.input_name == "State" || el.input_name == "City" || el.input_name == "Area" || el.input_name == "Price" || el.input_name == "Bedrooms" || el.input_name == "Bathrooms" || el.input_name == "Water supply" || el.input_name == "Floor No" || el.input_name == "Builtup area (ft²)" || el.input_name == "Car Parking" || el.input_name == "Facing" || el.input_name == "Furnishing" || el.input_name == "Other Amenities" || el.input_name == "Maintenance (Month)"))

  const other = data[0]?.inputs?.filter(el => el.input_name == "Other Amenities")

  console.log("xxxxxxx", menuId);

  return (
    <>
      {" "}
      <h5 className="title fw-6">Key Features</h5>
      <div className="row single-property-element single-property-desc">
        {data[0]?.inputs?.length && filterData.map((item, index) => (
          // <div className="col-sm-12 col-md-6" key={index}>
          //   <div className="inner-box">
          //     <span className="label text-black-3" style={{minWidth: "220px"}}>{item.input_name}</span>
          //     <div className="content text-black-3">{item.input_value}</div>
          //   </div>
          // </div>
          <div
            className="col-12 col-md-6 mb-3"
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="inner-box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
              <span
                className="label text-black-3"
                style={{ minWidth: "220px", flexShrink: 0 }}
              >
                {item.input_name}
              </span>
              <div
                className="content text-black-3"
                style={{ flex: "1", marginTop: "10px" }}
              >
                {item.input_value}
              </div>
            </div>
          </div>

        ))}
      </div>
      {" "}
      {menuId == 1 &&
        <div>
          <h5 className="title fw-6">Other Aminities</h5>
          <div className="row single-property-element single-property-desc">
            <p name="" id="">
              {data[0]?.inputs?.filter(el => el.input_name == "Other Amenities")[0]?.input_value}
            </p>
          </div>
        </div>
      }
    </>
  );
}
