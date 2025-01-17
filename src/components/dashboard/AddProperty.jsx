import React, { useState, useEffect } from "react";
import DropdownSelect from "../common/DropdownSelect";
import { getCategories, getInputs, createNewProperty, getPropertyEdit, updateProperty } from "@/apiCalls";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

export default function AddProperty() {

  const params = useParams();

  const [editData, setEditData] = useState();

  const [updatedData, setUpdatedData] = useState();

  const [images, setImages] = useState([]);

  console.log(images , "kkkkkkkkkkkkkkkkk")

  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')

  const handlePrevChange = (inputId, value, input_name) => {

    setUpdatedData(prevState => {
      const updatedInputs = prevState[0]?.inputs?.map(input =>
        input.id === inputId ? { ...input, input_value: value } : input
      );
      return [{ ...prevState[0], inputs: updatedInputs }];
    });
  };


  const transformData = (updatedData) => {

    const updatedPaths = images.length && images.map((image) => image.preview).join(",");


    const properties = updatedData.map(item => ({
      id: item.id,
      sub_menuId: item.sub_menuId,
      sellerId: item.sellerId,
      location: item.location,
      price: item.price,
      status: item.status,
      updatedFiles: updatedPaths,
      isPremium: item.isPremium,
      createdAt: item.createdAt,
    }));


    console.log(properties , "ppppppppppppppppppppppppppppppp")
    // Extract the inputs and create the "propertyInputs" array
    const propertyInputs = updatedData.flatMap(item => item.inputs.map(input => ({
      properties_postId: input.properties_postId,
      input_id: input.input_id,
      input_value: input.input_value,
    })));

    // Extract the input names, types, and options to create the "inputs" array
    // const inputs = updatedData.flatMap(item => item.inputs.map(input => ({
    //   id: input.input_id,
    //   input_name: input.input_name,
    //   input_type: input.input_type,
    //   options: input.options,
    // })));

    // Return the final structured data
    return {
      properties,
      propertyInputs,
      // inputs,
    };
  };

  const handlePrevSubmit = async () => {
    const structuredData = transformData(updatedData , images);

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    const payLoad = {
      data: structuredData,
      images,
    }

    if (landsUser) {
      try {
        const data = await updateProperty(payLoad);
        if (data.success) {
          toast.success("UpdatedSuccessfully")
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    } else {
      toast.error('You must be logged in to access this page');
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

        if (landsUser) {
          try {
            const data = await getPropertyEdit(params.id);
            if (data.success) {
              const combined = data.properties.map((property) => {
                const propertyInputs = data.propertyInputs?.filter(input => input.properties_postId === property.id);

                const inputsWithNames = propertyInputs.map((input) => {
                  const inputData = data.inputs.find(i => i.id === input.input_id);
                  return {
                    ...input,
                    input_name: inputData ? inputData.input_name : '',
                    input_type: inputData ? inputData.input_type : '',
                    options: inputData ? inputData.options : [],
                  };
                });

                return {
                  ...property,
                  inputs: inputsWithNames,
                };
              });

              if (combined.length > 0) {
                const filePathsArray = combined[0].file_path.split(",").map((url, index) => ({
                  id: index + 1, 
                  preview: url, 
                }));

                if (filePathsArray.length > 0) {
                  setImages(filePathsArray);
                }
              }

              setEditData(combined);
              setUpdatedData(combined)

            } else {
              toast.error(data.message);
            }
          } catch (err) {
            console.error('Error fetching categories:', err);
          }
        } else {
          toast.error('You must be logged in to access this page');
        }
      }
    };

    fetchData();
  }, [params]);


  const [isDragging, setIsDragging] = useState(false); // Track drag state

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const maxFiles = 10 - images.length; // Calculate remaining slots

    if (files.length > maxFiles) {
      alert(`You can only add ${maxFiles} more images.`);
      return;
    }

    const newFiles = files.slice(0, maxFiles).map((file, index) => ({
      id: `${Date.now()}-${index}`, // Generate a unique ID for each file
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newFiles]); // Append new files to existing state
  };

  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 10 - images.length);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[prevImages.length + index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [menuInputs, setMenuInputs] = useState();
  const [formData, setFormData] = useState({});


  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      if (data.success) {
        setCategories(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const fetchInputs = async () => {
    try {
      const data = await getInputs(selectedSubCategoryId);
      if (data.success) {
        setMenuInputs(data.inputs)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchInputs();
  }, [selectedSubCategoryId]);


  const handleCategoryChange = (category) => {
    setFormData({})
    setSelectedCategory(category);
    const selectedSubCategories = category.subMenus || [];
    setSubCategories(selectedSubCategories);
    setSelectedSubCategoryId(null);
  };

  const handleSubCategoryChange = (subCategory) => {
    setFormData({})
    setSelectedSubCategoryId(subCategory.id);
  };

  const handleChange = (id, value, name) => {
    name == "location" && setLocation(value)
    name == "price" && setPrice(value)

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleSubmit = async () => {

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {

      const PropertiesInput = Object.entries(formData).map(([inputId, value]) => ({
        inputId: Number(inputId),
        value: value,
      }));

      const payload = {
        propertiesPost: {
          subMenuId: selectedSubCategoryId,
          sellerId: landsUser.id,
          location: location,
          price: price,
          images
        },
        PropertiesInput,
      };

      try {
        const data = await createNewProperty(payload);
        if (data.success) {
          setMenuInputs(null)
          toast.success("Property Created Successfully");
          setImages([]);
        } else {
          toast.error(data.message || data.error || "Something Went Wrong")
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }

    } else {
      toast.error("Seller Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 4000);
    }

  };

  return (
    <div className="main-content">
      <div className="main-content-inner">
        <div className="button-show-hide show-mb">
          <span className="body-1">Show Menu</span>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Upload Media</h5>
          <div className="box-uploadfile text-center">
            <div
              className="uploadfile"
              style={
                isDragging
                  ? { borderStyle: "solid", backgroundColor: "#f2f3f4" }
                  : {}
              }
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <a href="#" className="btn-upload tf-btn primary">
                <svg
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Select photos
                {/* <input
                  type="file"
                  className="ip-file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, images.length)}
                /> */}
                <input
                  type="file"
                  className="ip-file"
                  accept="image/*"
                  multiple
                  max={10 - images.length}
                  disabled={images.length >= 10}
                  onChange={(e) => handleImageChange(e)}
                />
              </a>
              <p className="file-name fw-5">
                or drag photos here <br />
                <span>(Up to {10 - images.length} photos)</span>
              </p>
            </div>
          </div>
          <div className="box-img-upload">
            {images.map((img, index) => (
              <div key={index} className="item-upload file-delete">
                <img alt={`Uploaded preview ${index + 1}`} src={img.preview} width={615} height={405} />
                <span
                  className="icon icon-trash remove-file"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {!editData?.length > 0 && (
          <div className="widget-box-2 mb-20">
            <div className="box-price-property">
              <div className="box grid-2 gap-30">
                <fieldset className="box-fieldset">
                  <label htmlFor="neighborhood">
                    Category
                  </label>
                  <DropdownSelect
                    options={["Select", ...(categories?.map((category) => category.name) || [])]} // Prepend "All" to the options
                    onChange={(selectedCategory) => {
                      const category = categories.find((cat) => cat.name === selectedCategory);
                      handleCategoryChange(category);
                    }}
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="neighborhood">
                    Sub Category
                  </label>

                  <DropdownSelect
                    options={["Select", ...(subCategories?.map((subCat) => subCat.name) || [])]} // Prepend "All" to the options
                    onChange={(selectedSubCategory) => {
                      const subCategory = subCategories.find((sub) => sub.name === selectedSubCategory);
                      handleSubCategoryChange(subCategory);
                    }}
                  />
                </fieldset>
              </div>

            </div>
          </div>
        )}
        <div className="widget-box-2 mb-20">
          {editData?.length > 0 ? (
            <div className="box-info-property">
              {updatedData[0]?.inputs?.length ? (
                <div className="box grid-2 gap-30">
                  {updatedData[0].inputs.map((input) => {
                    const { id, input_name, input_type, options, input_value } = input;

                    let inputField = null;
                    switch (input_type) {
                      case "text":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <input
                              type="text"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value, input_name)}
                            />
                          </fieldset>
                        );
                        break;

                      case "textarea":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <textarea
                              id={input_name}
                              name={input_name}
                              className="textarea"
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "number":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <input
                              type="number"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value, input_name)}
                            />
                          </fieldset>
                        );
                        break;

                      case "dropdown":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <select
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value)}
                            >
                              <option value="">Select</option>
                              {options?.map((option, idx) => (
                                <option key={idx} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </fieldset>
                        );
                        break;

                      case "checkbox":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <div className="d-flex flex-row">
                              {options?.map((option, idx) => (
                                <div key={idx} className="pe-4">
                                  <input
                                    type="checkbox"
                                    id={`${input_name}-${option}`}
                                    name={input_name}
                                    value={option}
                                    checked={input_value?.split(",").includes(option)}
                                    onChange={(e) => {
                                      const newValue = input_value?.split(",") || [];
                                      const updatedValue = e.target.checked
                                        ? [...newValue, option]
                                        : newValue.filter((val) => val !== option);
                                      handlePrevChange(input.id, updatedValue.join(","));
                                    }}
                                  />
                                  <label htmlFor={`${input_name}-${option}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        );
                        break;

                      case "radio":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <div className="d-flex flex-row">
                              {options?.map((option, idx) => (
                                <div key={idx} className="pe-4">
                                  <input
                                    type="radio"
                                    id={`${input_name}-${option}`}
                                    name={input_name}
                                    value={option}
                                    checked={input_value === option}
                                    onChange={(e) => handlePrevChange(input.id, e.target.value)}
                                  />
                                  <label htmlFor={`${input_name}-${option}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        );
                        break;

                      case "date":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <input
                              type="date"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "email":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <input
                              type="email"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => handlePrevChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "password":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name}
                            </label>
                            <input
                              type="password"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      default:
                        break;
                    }

                    return inputField;
                  })}
                </div>
              ) : (
                <div className="box grid-2 gap-30">
                  <h3>No Inputs</h3>
                </div>
              )}
            </div>
          ) : (
            <div className="box-info-property">
              {menuInputs?.length ? (
                <div className="box grid-2 gap-30">
                  {menuInputs?.length && menuInputs.map((input, index) => {
                    const { id, input_name, input_type, options, required } = input;

                    let inputField = null;
                    switch (input_type) {
                      case "text":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="text"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => handleChange(input.id, e.target.value, input_name)}
                            />
                          </fieldset>
                        );
                        break;

                      case "textarea":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <textarea
                              id={input_name}
                              name={input_name}
                              className="textarea"
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => handleChange(input.id, e.target.value, input_name)}
                            />
                          </fieldset>
                        );
                        break;

                      case "number":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="number"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => handleChange(input.id, e.target.value, input_name)}
                            />
                          </fieldset>
                        );
                        break;

                      case "dropdown":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <select
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              onChange={(e) => handleChange(input.id, e.target.value, input_name)}
                            >
                              <option>
                                Select
                              </option>
                              {options?.map((option, idx) => (
                                <option key={idx} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </fieldset>
                        );
                        break;

                      case "checkbox":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <div className="d-flex flex-row">
                              {options?.map((option, idx) => (
                                <div key={idx} className="pe-4">
                                  <input
                                    type="checkbox"
                                    id={`${input_name}-${option}`}
                                    name={input_name}
                                    value={option}
                                    onChange={(e) => {
                                      const newValue = formData[input.id]?.split(",") || []; // Split the existing value into an array
                                      const updatedValue = e.target.checked
                                        ? [...newValue, option] // Add the new option if checked
                                        : newValue.filter((val) => val !== option); // Remove the option if unchecked
                                      handleChange(input.id, updatedValue.join(",")); // Convert the array back to a comma-separated string
                                    }}
                                  />
                                  <label htmlFor={`${input_name}-${option}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </fieldset>

                        );
                        break;

                      case "radio":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <div class="d-flex flex-row">
                              {options?.map((option, idx) => (
                                <div key={idx} className="pe-4">
                                  <input
                                    type="radio"
                                    id={`${input_name}-${option}`}
                                    name={input_name}
                                    value={option}
                                    onChange={(e) => handleChange(input.id, e.target.value)}
                                  />
                                  <label htmlFor={`${input_name}-${option}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        );
                        break;

                      case "date":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="date"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "email":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="email"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "password":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="password"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => handleChange(input.id, e.target.value)}
                            />
                          </fieldset>
                        );
                        break;

                      case "file":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{required ? "*" : ""}</span>
                            </label>
                            <input
                              type="file"
                              id={input_name}
                              name={input_name}
                              className="form-control"
                              onChange={(e) => handleChange(input.id, e.target.files[0])}
                            />
                          </fieldset>
                        );
                        break;

                      default:
                        break;
                    }

                    return inputField;
                  })}
                </div>
              ) : (
                <div className="box grid-2 gap-30">
                  <h3>No Inputs</h3>
                </div>
              )}


            </div>
          )}
        </div>

        {/* <div className="widget-box-2 mb-20">
          <div className="box-info-property">
            <fieldset className="box box-fieldset">
              <label htmlFor="title">
                {" "}
                Title:<span>*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Choose"
              />
            </fieldset>
            <fieldset className="box box-fieldset">
              <label htmlFor="desc">Description:</label>
              <textarea
                className="textarea"
                placeholder="Your Decscription"
                defaultValue={""}
              />
            </fieldset>
            <div className="box grid-3 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="address">
                  {" "}
                  Full Address:<span>*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter property full address"
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="zip">
                  {" "}
                  Pin Code:<span>*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter property zip code"
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="country">
                  {" "}
                  Country:<span>*</span>{" "}
                </label>

                <DropdownSelect
                  options={["India"]}
                />
              </fieldset>
            </div>
            <div className="box grid-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="state">
                  {" "}
                  Province/State:<span>*</span>{" "}
                </label>

                <DropdownSelect options={["Tamil Nadu", "Kerala", "Andhra"]} />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="neighborhood">
                  Neighborhood:<span>*</span>
                </label>

                <DropdownSelect
                  options={["None", "Little Italy", "Bedford Park"]}
                />
              </fieldset>
            </div>
            <div className="box box-fieldset">
              <label htmlFor="location">
                Location:<span>*</span>
              </label>
              <div className="box-ip">
                <input
                  type="text"
                  className="form-control"
                  defaultValue="None"
                />
                <a href="#" className="btn-location">
                  <i className="icon icon-location" />
                </a>
              </div>
              <iframe
                className="map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d135905.11693909427!2d-73.95165795400088!3d41.17584829642291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727094281524!5m2!1sen!2s"
                width="100%"
                height={456}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Price</h5>
          <div className="box-price-property">
            <div className="box grid-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="price">
                  Price:<span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Example value: 12345.67"
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="neighborhood">
                  Unit Price:<span>*</span>
                </label>

                <DropdownSelect options={["None", "1000", "2000"]} />
              </fieldset>
            </div>
            <div className="grid-2 gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="price">
                  Before Price Label:<span>*</span>
                </label>
                <input type="text" className="form-control" />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="price">
                  After Price Label:<span>*</span>
                </label>
                <input type="text" className="form-control" />
              </fieldset>
            </div>
          </div>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Addtional Infomation</h5>
          <div className="box grid-3 gap-30">
            <fieldset className="box-fieldset">
              <label htmlFor="type">
                {" "}
                Property Type:<span>*</span>{" "}
              </label>

              <DropdownSelect
                options={[
                  "Apartment",
                  "Villa",
                  "Studio",
                  "Office",
                  "Townhouse",
                ]}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="status">
                {" "}
                Property Status:<span>*</span>{" "}
              </label>

              <DropdownSelect options={["For Rent", "For Sale"]} />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="label">
                {" "}
                Property Label:<span>*</span>{" "}
              </label>

              <DropdownSelect options={["New Listing", "Open House"]} />
            </fieldset>
          </div>
          <div className="box grid-3 gap-30">
            <fieldset className="box-fieldset">
              <label htmlFor="size">
                {" "}
                Size (SqFt):<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="land">
                {" "}
                Land Area (SqFt):<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="id">
                {" "}
                Property ID:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
          </div>
          <div className="box grid-3 gap-30">
            <fieldset className="box-fieldset">
              <label htmlFor="rom">
                {" "}
                Rooms:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="bedrooms">
                {" "}
                Bedrooms:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="bathrooms">
                {" "}
                Bathrooms:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
          </div>
          <div className="box grid-3 gap-30">
            <fieldset className="box-fieldset">
              <label htmlFor="garages">
                {" "}
                Garages:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="garages-size">
                Garages Size (SqFt):<span>*</span>
              </label>
              <input type="text" className="form-control" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label htmlFor="year">
                {" "}
                Year Built:<span>*</span>{" "}
              </label>
              <input type="text" className="form-control" />
            </fieldset>
          </div>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">
            Amenities<span>*</span>
          </h5>
          <div className="box-amenities-property">
            <div className="box-amenities">
              <div className="title-amenities text-btn">Home safety:</div>
              <div className="list-amenities">
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1"
                    id="cb1"
                    defaultChecked=""
                  />
                  <label htmlFor="cb1" className="text-cb-amenities">
                    Smoke alarm
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb2"
                  />
                  <label htmlFor="cb2" className="text-cb-amenities">
                    Self check-in with lockbox
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb3"
                    defaultChecked=""
                  />
                  <label htmlFor="cb3" className="text-cb-amenities">
                    Carbon monoxide alarm
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb4"
                  />
                  <label htmlFor="cb4" className="text-cb-amenities">
                    Security cameras
                  </label>
                </fieldset>
              </div>
            </div>
            <div className="box-amenities">
              <div className="title-amenities text-btn">Bedroom</div>
              <div className="list-amenities">
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1"
                    id="cb-bed1"
                  />
                  <label htmlFor="cb-bed1" className="text-cb-amenities">
                    Hangers
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-bed2"
                  />
                  <label htmlFor="cb-bed2" className="text-cb-amenities">
                    Extra pillows &amp; blankets
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-bed3"
                  />
                  <label htmlFor="cb-bed3" className="text-cb-amenities">
                    Bed linens
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-bed4"
                  />
                  <label htmlFor="cb-bed4" className="text-cb-amenities">
                    TV with standard cable
                  </label>
                </fieldset>
              </div>
            </div>
            <div className="box-amenities">
              <div className="title-amenities text-btn">Kitchen:</div>
              <div className="list-amenities">
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1"
                    id="cb-kit1"
                  />
                  <label htmlFor="cb-kit1" className="text-cb-amenities">
                    Refrigerator
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-kit2"
                  />
                  <label htmlFor="cb-kit2" className="text-cb-amenities">
                    Dishwasher
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-kit3"
                  />
                  <label htmlFor="cb-kit3" className="text-cb-amenities">
                    Microwave
                  </label>
                </fieldset>
                <fieldset className="amenities-item">
                  <input
                    type="checkbox"
                    className="tf-checkbox style-1 primary"
                    id="cb-kit4"
                  />
                  <label htmlFor="cb-kit4" className="text-cb-amenities">
                    Coffee maker
                  </label>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Virtual Tour 360</h5>
          <div className="box-radio-check">
            <div className="text-btn mb-16">Virtual Tour Type:</div>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio"
                id="radio1"
                defaultChecked=""
              />
              <label htmlFor="radio1" className="text-radio">
                Embedded code
              </label>
            </fieldset>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio"
                id="radio2"
              />
              <label htmlFor="radio2" className="text-radio">
                Upload image
              </label>
            </fieldset>
          </div>
          <fieldset className="box-fieldset">
            <label htmlFor="embedded">Embedded Code Virtual 360</label>
            <textarea className="textarea" defaultValue={""} />
          </fieldset>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Videos</h5>
          <fieldset className="box-fieldset">
            <label htmlFor="video" className="text-btn">
              Video URL:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Youtube, vimeo url"
            />
          </fieldset>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Floors</h5>
          <div className="box-radio-check">
            <div className="text-btn mb-16">Enable Floor Plan:</div>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio2"
                id="radio3"
                defaultChecked=""
              />
              <label htmlFor="radio3" className="text-radio">
                Enable
              </label>
            </fieldset>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio2"
                id="radio4"
              />
              <label htmlFor="radio4" className="text-radio">
                Disable
              </label>
            </fieldset>
          </div>
          <div className="box-floor-property file-delete">
            <div className="top d-flex justify-content-between align-items-center">
              <h6>Floor 1:</h6>
              <a href="#" className="remove-file">
                <span className="icon icon-close2" />
              </a>
            </div>
            <fieldset className="box box-fieldset">
              <label htmlFor="name">Floor Name:</label>
              <input type="text" className="form-control style-1" />
            </fieldset>
            <div className="grid-2 box gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="floor-price">Floor Price (Only Digits):</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="price-postfix">Price Postfix:</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
            </div>
            <div className="grid-2 box gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="floor-size">Floor Size (Only Digits):</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="size-postfix">Size Postfix:</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
            </div>
            <div className="grid-2 box gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="bedrooms">Bedrooms:</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="bathrooms">Bathrooms:</label>
                <input type="text" className="form-control style-1" />
              </fieldset>
            </div>
            <div className="grid-2 box gap-30">
              <fieldset className="box-fieldset">
                <label htmlFor="bedrooms">Floor Image:</label>
                <div className="box-floor-img uploadfile">
                  <a href="#" className="btn-upload tf-btn primary">
                    <svg
                      width={21}
                      height={20}
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.375 13.125L6.67417 8.82583C6.84828 8.65172 7.05498 8.51361 7.28246 8.41938C7.50995 8.32515 7.75377 8.27665 8 8.27665C8.24623 8.27665 8.49005 8.32515 8.71754 8.41938C8.94502 8.51361 9.15172 8.65172 9.32583 8.82583L13.625 13.125M12.375 11.875L13.5492 10.7008C13.7233 10.5267 13.93 10.3886 14.1575 10.2944C14.385 10.2001 14.6288 10.1516 14.875 10.1516C15.1212 10.1516 15.365 10.2001 15.5925 10.2944C15.82 10.3886 16.0267 10.5267 16.2008 10.7008L18.625 13.125M3.625 16.25H17.375C17.7065 16.25 18.0245 16.1183 18.2589 15.8839C18.4933 15.6495 18.625 15.3315 18.625 15V5C18.625 4.66848 18.4933 4.35054 18.2589 4.11612C18.0245 3.8817 17.7065 3.75 17.375 3.75H3.625C3.29348 3.75 2.97554 3.8817 2.74112 4.11612C2.5067 4.35054 2.375 4.66848 2.375 5V15C2.375 15.3315 2.5067 15.6495 2.74112 15.8839C2.97554 16.1183 3.29348 16.25 3.625 16.25ZM12.375 6.875H12.3817V6.88167H12.375V6.875ZM12.6875 6.875C12.6875 6.95788 12.6546 7.03737 12.596 7.09597C12.5374 7.15458 12.4579 7.1875 12.375 7.1875C12.2921 7.1875 12.2126 7.15458 12.154 7.09597C12.0954 7.03737 12.0625 6.95788 12.0625 6.875C12.0625 6.79212 12.0954 6.71263 12.154 6.65403C12.2126 6.59542 12.2921 6.5625 12.375 6.5625C12.4579 6.5625 12.5374 6.59542 12.596 6.65403C12.6546 6.71263 12.6875 6.79212 12.6875 6.875Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Choose File
                    <input type="file" className="ip-file" />
                  </a>
                  <p className="file-name">Or drop file here to upload</p>
                </div>
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="bathrooms">Description:</label>
                <textarea className="textarea" defaultValue={""} />
              </fieldset>
            </div>
          </div>
          <div className="text-center">
            <a href="#" className="btn-add-floor">
              <span className="icon icon-plus" />
            </a>
          </div>
        </div>
        <div className="widget-box-2 mb-20">
          <h5 className="title">Agent Infomation</h5>
          <div className="box-radio-check">
            <div className="text-btn mb-16">Choose type agent information?</div>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio3"
                id="radio5"
                defaultChecked=""
              />
              <label htmlFor="radio5" className="text-radio">
                Your current user information
              </label>
            </fieldset>
            <fieldset className="fieldset-radio">
              <input
                type="radio"
                className="tf-checkbox style-1"
                name="radio3"
                id="radio6"
              />
              <label htmlFor="radio6" className="text-radio">
                Other contact
              </label>
            </fieldset>
          </div>
        </div> */}
        {editData?.length ? (
          <div className="box-btn" onClick={handlePrevSubmit}>
            <a className="tf-btn primary">
              Update Property
            </a>
            {/* <a href="#" className="tf-btn btn-line">
          Save &amp; Preview
        </a> */}
          </div>
        ) : (
          <div className="box-btn" onClick={handleSubmit}>
            <a className="tf-btn primary">
              Add Property
            </a>
            {/* <a href="#" className="tf-btn btn-line">
            Save &amp; Preview
          </a> */}
          </div>
        )}

      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2024 Lands India</p>
      </div>
    </div>
  );
}
