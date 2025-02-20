import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import { MyContext } from "../../App";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Rating from "@mui/material/Rating";

const Sidebar = (props) => {
  const context = useContext(MyContext);
  const [value, setValue] = useState([10, 500]);
  const [brand, setBrand] = useState("");
  
  const [valueRadio, setValueRadio] = React.useState("");
  const [valueRating, setValueRating] = useState(0);
  const handleRadioChange = (event) => {
    setValueRadio(event.target.value);
    props.filterData(event.target.value);
    setBrand(event.target.value);
    setValueRating(0);
  };
  useEffect(() => {
    props.filterByPrice(value, brand);
  }, [value])

  
  useEffect(() => {
    props.filterByRating(valueRating, brand);
  }, [valueRating])
  return (
    <>
      <div className="sidebar">
     
        <div className="filterBox">
          <h6>Product Categories</h6>

          <div className="scroll">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valueRadio}
                onChange={handleRadioChange}
              >
                <ul>
                  {context.brandData?.length !== 0 &&
                    context.brandData?.map((item, index) => {
                      return (
                        <FormControlLabel
                          className="w-100"
                          control={<Radio />}
                          value={item}
                          label={item}
                        />
                      );
                    })}
                </ul>
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div className="filterBox mb-4">
          <h6>Filter by price</h6>
          <RangeSlider
            value={value}
            onInput={setValue}
            min={100}
            max={500}
            step={5}
          />

          <div className="d-flex pt-2 pb-2 priceRange">
            <span>
              From: <strong className="text-dark">$: {value[0]}</strong>
            </span>
            <span className="ml-auto">
              From: <strong className="text-dark">$: {value[1]}</strong>
            </span>
          </div>
        </div>

        <div className="filterBox">
          <h6>Filter by Rating</h6>

          <div className="scroll pl-0">
            <Rating
              name="ratingFilter"
              value={valueRating}
              onChange={(event, newValue) => {
                // if(subCateId === "") alert("Please choose product category!"); 
                // else
                setValueRating(newValue);
                
              }}
             
            />
          </div>
        </div>

        {/* <div className="filterBox">
          <h6>Brands</h6>

          <div className="scroll">
            <ul>
              <li>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    className="w-100 "
                    control={<Checkbox />}
                    label="Oreo"
                  />
                  <p className="ml-auto mb-1">(1)</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Quaker"
                  />
                  <p className="ml-auto mb-1">(1)</p>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <FormControlLabel
                    className="w-100"
                    control={<Checkbox />}
                    label="Welch's"
                  />
                  <p className="ml-auto mb-1">(1)</p>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
        <Link to="#">
          <img
            src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif"
            className="w-100" alt="banner"
          ></img>
        </Link>
      </div>
    
    </>
  );
};

export default Sidebar;
