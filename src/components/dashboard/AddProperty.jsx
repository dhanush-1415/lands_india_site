import React, { useState, useEffect, useRef } from "react";
import DropdownSelect from "../common/DropdownSelect";
import { getCategories, getInputs, createNewProperty, getPropertyEdit, updateProperty } from "@/apiCalls";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Grid, Autocomplete, TextField } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CircularProgress from '@mui/material/CircularProgress';


export default function AddProperty() {

  const params = useParams();

  const [editData, setEditData] = useState();

  const [updatedData, setUpdatedData] = useState();

  const [images, setImages] = useState([]);
  const [invalidCreateIds, setInvalidCreateIds] = useState([]);
  const [invalidEditIds, setInvalidEditIds] = useState([]);

  const [location, setLocation] = useState('');

  const [price, setPrice] = useState('');

  const [submitBtn, setSubmitBtn] = useState("Add Property")
  const [prevBtn, setPrevBtn] = useState("Update Property");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handlePrevChange = (inputId, value, input_name) => {

    setUpdatedData(prevState => {
      const updatedInputs = prevState[0]?.inputs?.map(input =>
        input.id === inputId ? { ...input, input_value: value || "" } : input
      );
      return [{ ...prevState[0], inputs: updatedInputs }];
    });
  };


  const transformData = (updatedData) => {

    // const updatedPaths = images.length && images.map((image) => image.preview).join(",");

    const updatedPaths = images.length
      ? images
        .filter((image) => !image.file)
        .map((image) => image.preview)
        .join(",")
      : "";



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
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!images.length) {
      toast.error("Please fill in all required fields before submitting the form")
      return
    }

    // Validate required edit inputs
    const editInputs = (updatedData?.[0]?.inputs) || [];
    const missingEdit = editInputs.filter((inp) => inp.required && !isFilled(inp, inp.input_value));
    if (missingEdit.length) {
      setInvalidEditIds(missingEdit.map((m) => m.input_id));
      const firstMissing = missingEdit[0]?.input_name || 'required fields';
      toast.error(`Please fill the required fields (e.g., ${firstMissing}).`);
      return;
    }

    setIsSubmitting(true); // Start loader
    setPrevBtn("Uploading...")

    const structuredData = transformData(updatedData, images);

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    const payLoad = {
      data: structuredData,
      images,
    }

    if (landsUser) {
      try {
        const data = await updateProperty(payLoad);
        if (data.success) {
          toast.success("Updated Successfully")
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Error updating property:', err);
        toast.error("An error occurred while updating the property. Please try again.");
      } finally {
        setIsSubmitting(false); // Stop loader
        setPrevBtn("Update Property") // Reset button text
      }
    } else {
      toast.error('You must be logged in to access this page');
      setIsSubmitting(false); // Stop loader
      setPrevBtn("Update Property") // Reset button text
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
                    required: inputData ? !!inputData.required : false,
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
  const dragItemIndexRef = useRef(null);
  const dragOverIndexRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const maxFiles = 10 - images.length; // Calculate remaining slots
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes

    if (files.length > maxFiles) {
      toast.error(`You can only add ${maxFiles} more images.`);
      return;
    }

    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      const oversizedNames = oversizedFiles.map(f => f.name).join(', ');
      toast.error(`File size exceeds 1MB limit: ${oversizedNames}`);
      return;
    }

    const validFiles = files.filter(file => file.size <= maxFileSize).slice(0, maxFiles);
    const newFiles = validFiles.map((file, index) => ({
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
    const files = Array.from(e.dataTransfer.files);
    const maxFiles = 10 - images.length;
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes

    if (files.length > maxFiles) {
      toast.error(`You can only add ${maxFiles} more images.`);
      setIsDragging(false);
      return;
    }

    // Check file sizes
    const oversizedFiles = files.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      const oversizedNames = oversizedFiles.map(f => f.name).join(', ');
      toast.error(`File size exceeds 1MB limit: ${oversizedNames}`);
      setIsDragging(false);
      return;
    }

    const validFiles = files.filter(file => file.size <= maxFileSize).slice(0, maxFiles);
    validFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[prevImages.length + index] = {
            id: `${Date.now()}-${index}`,
            file,
            preview: reader.result,
          };
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    });
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleItemDragStart = (index) => (e) => {
    dragItemIndexRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  };

  const handleItemDragEnter = (index) => (e) => {
    e.preventDefault();
    dragOverIndexRef.current = index;
  };

  const handleItemDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemDrop = (e) => {
    e.preventDefault();
    const fromIndex = dragItemIndexRef.current;
    const toIndex = dragOverIndexRef.current;
    if (fromIndex == null || toIndex == null || fromIndex === toIndex) {
      dragItemIndexRef.current = null;
      dragOverIndexRef.current = null;
      setIsDragging(false);
      return;
    }
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setImages(updated);
    dragItemIndexRef.current = null;
    dragOverIndexRef.current = null;
    setIsDragging(false);
  };

  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [menuInputs, setMenuInputs] = useState();
  const [formData, setFormData] = useState({});

  // States and Cities (India) for State/City dropdowns
  const [indiaStates, setIndiaStates] = useState([]);
  const [citiesByState, setCitiesByState] = useState({}); // { [stateName]: string[] }
  const [selectedState, setSelectedState] = useState(""); // create mode
  const [selectedEditState, setSelectedEditState] = useState(""); // edit mode

  const fetchIndiaStates = async () => {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India" })
      });
      const json = await res.json();
      if (!json.error && json?.data?.states?.length) {
        setIndiaStates(json.data.states.map((s) => s.name));
      }
    } catch (e) {
      // ignore network errors; user can retry interaction
    }
  };

  const fetchCitiesForState = async (stateName) => {
    if (!stateName || citiesByState[stateName]) return;
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: stateName })
      });
      const json = await res.json();
      if (!json.error && Array.isArray(json.data)) {
        setCitiesByState((prev) => ({ ...prev, [stateName]: json.data }));
      }
    } catch (e) {
      // ignore network errors; user can retry interaction
    }
  };

  useEffect(() => {
    fetchIndiaStates();
  }, []);


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
    name == "City" && setLocation(value)
    name == "Price" && setPrice(value)

    setFormData((prev) => ({
      ...prev,
      [id]: value || "", // Ensure empty string for empty values
    }));

    // Clear create invalid state when user fills value
    setInvalidCreateIds((prev) => prev.filter((x) => x !== id));
  };

  // When edit data loads, hydrate selected edit state and ensure city list is present
  useEffect(() => {
    if (updatedData?.[0]?.inputs?.length) {
      const st = updatedData[0].inputs.find((i) => i.input_name === "State")?.input_value || "";
      if (st) {
        setSelectedEditState(st);
        fetchCitiesForState(st);
      }
    }
  }, [updatedData]);

  const isFilled = (inputDef, value) => {
    if (value === undefined || value === null) return false;
    const v = typeof value === 'string' ? value.trim() : value;
    if (inputDef.input_type === 'dropdown') return v !== '' && v !== 'Select';
    if (inputDef.input_type === 'checkbox') return v !== '';
    if (inputDef.input_type === 'radio') return v !== '';
    if (inputDef.input_type === 'file') return !!value;
    return v !== '';
  };

  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    if (!images.length) {
      toast.error("Please fill in all required fields before submitting the form")
      return
    }

    // Validate required create inputs
    const requiredInputs = (menuInputs || []).filter((inp) => inp.required);
    const missing = requiredInputs.filter((inp) => !isFilled(inp, formData[inp.id]));
    if (missing.length) {
      setInvalidCreateIds(missing.map((m) => m.id));
      const firstMissing = missing[0]?.input_name || 'required fields';
      toast.error(`Please fill the required fields (e.g., ${firstMissing}).`);
      return;
    }

    setIsSubmitting(true); // Start loader
    setSubmitBtn("Uploading...")

    const landsUser = JSON.parse(localStorage.getItem('LandsUser'));

    if (landsUser) {

      // Ensure all inputs (both mandatory and non-mandatory) are included
      const PropertiesInput = (menuInputs || []).map((input) => ({
        inputId: Number(input.id),
        value: formData[input.id] || "", // Use empty string if not filled
      }));

      const payload = {
        propertiesPost: {
          subMenuId: selectedSubCategoryId,
          sellerId: landsUser.id,
          location: location,
          price: price,
          mainMenuId: selectedCategory.id,
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
          setFormData({}); // Reset form data
          setSubmitBtn("Add Property") // Reset button text
        } else {
          toast.error(data.message || data.error || "Something Went Wrong")
        }
      } catch (err) {
        console.error('Error creating property:', err);
        toast.error("An error occurred while creating the property. Please try again.");
      } finally {
        setIsSubmitting(false); // Stop loader
        setSubmitBtn("Add Property") // Reset button text
      }

    } else {
      toast.error("Seller Not Found")
      setTimeout(() => {
        window.location.href = "/"
      }, 2000);
    }

  };

  return (
    <div className="main-content">
      <style>{`
        @media (min-width: 800px) {
          .custom-header-text {
            display: none !important;
          }
            .main-content{
            width: 100%
          }
        }
          .custom-header-text {
            display: flex ;
            justify-content:flex-start;
            align-items: center;
          }
        @media (max-width: 798px) {
      
          .main-content{
            width: 100%
          }
            .custom-bg-dark{
            font-weight:bold;
            background: #008FF7;
            color:#ffffff !important;
            padding: 7px 12px;
            border-radius: 10%;
            border:none;
          }
        }
        .invalid-control {
          border-color: #dc3545 !important;
        }
        .invalid-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        .tf-btn:disabled {
          background-color: #6c757d !important;
          color: #ffffff !important;
        }
        .tf-btn button {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0;
          margin: 0;
        }
        .tf-btn button:disabled {
          background: none !important;
          border: none !important;
        }
      `}</style>
      <div className="main-content-inner">
        <div className="d-flex justify-content-between">
          <div className="button-show-hide custom-header-text">
            < ArrowCircleLeftIcon sx={{ fontSize: '40px' }} />
            <span className="body-1">Menu</span>
          </div>
        </div>
        <div className="button-show-hide" style={{ marginTop: '0px', display: 'flex' }}>
          <h3 className="body-1" style={{ color: '#000', padding: '20px 0', fontWeight: '600' }}>Post Your Property</h3>
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
                  {(() => {
                    const inputs = updatedData[0].inputs;
                    const stateInput = inputs.find((i) => i.input_name === 'State');
                    const cityInput = inputs.find((i) => i.input_name === 'City');
                    const otherInputs = inputs.filter((i) => i.input_name !== 'State' && i.input_name !== 'City');

                    const blocks = [];

                    if (stateInput) {
                      blocks.push(
                        <fieldset key={stateInput.id} className="box box-fieldset">
                          <label htmlFor={stateInput.input_name}>
                            {stateInput.input_name} <span>{stateInput.required ? "*" : ""}</span>
                          </label>
                          <Autocomplete
                            options={indiaStates}
                            value={stateInput.input_value || ""}
                            onChange={async (_, val) => {
                              const selected = val || "";
                              handlePrevChange(stateInput.id, selected, stateInput.input_name);
                              setInvalidEditIds((prev)=> prev.filter((x)=> x !== stateInput.input_id));
                              setSelectedEditState(selected);
                              await fetchCitiesForState(selected);
                              if (cityInput) {
                                handlePrevChange(cityInput.id, "", "City");
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Select" />
                            )}
                          />
                        </fieldset>
                      );
                    }

                    if (cityInput) {
                      const currentState = (stateInput?.input_value) || selectedEditState || "";
                      const cityOptions = currentState ? (citiesByState[currentState] || []) : [];
                      blocks.push(
                        <fieldset key={cityInput.id} className="box box-fieldset">
                          <label htmlFor={cityInput.input_name}>
                            {cityInput.input_name} <span>{cityInput.required ? "*" : ""}</span>
                          </label>
                          <Autocomplete
                            options={cityOptions}
                            value={cityInput.input_value || ""}
                            onChange={(_, val) => { const selected = val || ""; handlePrevChange(cityInput.id, selected, cityInput.input_name); setInvalidEditIds((prev)=> prev.filter((x)=> x !== cityInput.input_id)); setLocation(selected); }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Select" />
                            )}
                          />
                        </fieldset>
                      );
                    }

                    return [
                      ...blocks,
                      ...otherInputs.map((input) => {
                    const { id, input_name, input_type, options, input_value } = input;

                    // Special handling for State and City in edit mode
                    if (input_name === "State" || input_name === "City") return null;

                    let inputField = null;
                    switch (input_type) {
                      case "text":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <input
                              type="text"
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value, input_name); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      case "textarea":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <textarea
                              id={input_name}
                              name={input_name}
                              className={`textarea ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      case "number":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <input
                              type="number"
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value, input_name); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      case "dropdown":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <select
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
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
                              {input_name} <span>{input.required ? "*" : ""}</span>
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
                                      setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id));
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
                              {input_name} <span>{input.required ? "*" : ""}</span>
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
                                    onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
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
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <input
                              type="date"
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      case "email":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <input
                              type="email"
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      case "password":
                        inputField = (
                          <fieldset key={id} className="box box-fieldset">
                            <label htmlFor={input_name}>
                              {input_name} <span>{input.required ? "*" : ""}</span>
                            </label>
                            <input
                              type="password"
                              id={input_name}
                              name={input_name}
                              className={`form-control ${invalidEditIds.includes(input.input_id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              value={input_value || ""}
                              onChange={(e) => { handlePrevChange(input.id, e.target.value); setInvalidEditIds((prev)=> prev.filter((x)=> x !== input.input_id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      default:
                        break;
                    }

                    return inputField;
                  })];
                  })()}
                </div>
              ) : (
                <div className="box grid-2 gap-30">
                  {/* <h3>No Inputs</h3> */}
                </div>
              )}
            </div>
          ) : (
            <div className="box-info-property">
              {menuInputs?.length ? (
                <div className="box grid-2 gap-30">
                  {(() => {
                    const inputs = menuInputs || [];
                    const stateInput = inputs.find((i) => i.input_name === 'State');
                    const cityInput = inputs.find((i) => i.input_name === 'City');
                    const otherInputs = inputs.filter((i) => i.input_name !== 'State' && i.input_name !== 'City');

                    const blocks = [];

                    if (stateInput) {
                      blocks.push(
                        <fieldset key={stateInput.id} className="box box-fieldset">
                          <label htmlFor={stateInput.input_name}>
                            {stateInput.input_name} <span>{stateInput.required ? "*" : ""}</span>
                          </label>
                          <Autocomplete
                            options={indiaStates}
                            value={formData[stateInput.id] || ""}
                            onChange={async (_, val) => {
                              const selected = val || "";
                              setSelectedState(selected);
                              handleChange(stateInput.id, selected, stateInput.input_name);
                              setInvalidCreateIds((prev) => prev.filter((x) => x !== stateInput.id));
                              await fetchCitiesForState(selected);
                              if (cityInput) {
                                handleChange(cityInput.id, "", "City");
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Select" />
                            )}
                          />
                        </fieldset>
                      );
                    }

                    if (cityInput) {
                      const currentState = selectedState || (formData[(inputs.find((i)=> i.input_name==='State')||{}).id] || "");
                      const cityOptions = currentState ? (citiesByState[currentState] || []) : [];
                      blocks.push(
                        <fieldset key={cityInput.id} className="box box-fieldset">
                          <label htmlFor={cityInput.input_name}>
                            {cityInput.input_name} <span>{cityInput.required ? "*" : ""}</span>
                          </label>
                          <Autocomplete
                            options={cityOptions}
                            value={formData[cityInput.id] || ""}
                            onChange={(_, val) => { const selected = val || ""; handleChange(cityInput.id, selected, cityInput.input_name); setInvalidCreateIds((prev) => prev.filter((x) => x !== cityInput.id)); }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Select" />
                            )}
                          />
                        </fieldset>
                      );
                    }

                    return [
                      ...blocks,
                      ...otherInputs.map((input) => {
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
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
                              className={`textarea ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
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
                                      setInvalidCreateIds((prev) => prev.filter((x) => x !== id));
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
                                    onChange={(e) => { handleChange(input.id, e.target.value); setInvalidCreateIds((prev) => prev.filter((x) => x !== id)); }}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
                              onChange={(e) => { handleChange(input.id, e.target.value); setInvalidCreateIds((prev) => prev.filter((x) => x !== id)); }}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => { handleChange(input.id, e.target.value); setInvalidCreateIds((prev) => prev.filter((x) => x !== id)); }}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
                              placeholder={`Enter ${input_name}`}
                              onChange={(e) => { handleChange(input.id, e.target.value); setInvalidCreateIds((prev) => prev.filter((x) => x !== id)); }}
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
                              className={`form-control ${invalidCreateIds.includes(id) ? 'invalid-control' : ''}`}
                              onChange={(e) => { handleChange(input.id, e.target.files[0]); setInvalidCreateIds((prev) => prev.filter((x) => x !== id)); }}
                            />
                          </fieldset>
                        );
                        break;

                      default:
                        break;
                    }

                    return inputField;
                  })
                    ];
                  })()}
                </div>
              ) : (
                <div className="box grid-2 gap-30">
                  {/* <h3>No Inputs</h3> */}
                </div>
              )}


            </div>
          )}
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
                <span>(Up to {10 - images.length} photos, max 1MB per file)</span>
              </p>
            </div>
          </div>
          <div className="box-img-upload">
            {images?.map((img, index) => (
              <div
                key={index}
                className="item-upload file-delete"
                draggable
                onDragStart={handleItemDragStart(index)}
                onDragEnter={handleItemDragEnter(index)}
                onDragOver={handleItemDragOver}
                onDrop={handleItemDrop}
                aria-grabbed={dragItemIndexRef.current === index}
                style={{ cursor: 'move' }}
              >
                <img alt={`Uploaded preview ${index + 1}`} src={img.preview} width={615} height={405} />
                <span
                  className="icon icon-trash remove-file"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
        </div>
        {editData?.length ? (
          <div className="box-btn">
            <button 
              className="tf-btn primary" 
              onClick={handlePrevSubmit}
              disabled={isSubmitting}
              style={{ 
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                position: 'relative',
                minHeight: '48px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Updating...
                </>
              ) : (
                prevBtn
              )}
            </button>
          </div>
        ) : (
          <div className="box-btn">
            <button 
              className="tf-btn primary" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{ 
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                position: 'relative',
                minHeight: '48px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Creating...
                </>
              ) : (
                submitBtn
              )}
            </button>
          </div>
        )}

      </div>
      <div className="footer-dashboard">
        <p>Copyright © 2025 i5property stars</p>
      </div>
    </div>
  );
}
