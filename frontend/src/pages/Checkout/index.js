import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { MyContext } from "../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
const Checkout = () => {
  const context = useContext(MyContext);
  const [provinceList, setProvinceList] = useState([]);
  useEffect(() => {
    setProvinceList(context.locationData);
  }, []);
  // console.log("provinceList", provinceList);

  const [provinceData, setProVinceData] = React.useState("");

  const handleChange = (event) => {
    setProVinceData(event.target.value);
  };
  return (
    <section className="section">
      <div className="container">
        <form>
          <div className="row">
            <div className="col-md-8">
              <h2 className="hd">BILLING DETAILS</h2>

              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="form-group">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      required="true"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                  <FormControl sx={{ m: 0, minWidth: 500 }}>
                    <h6>Tỉnh/Thành Phố *</h6>
                    <Select
                      size="small"
                      maxwidth
                      value={provinceData}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        provinceList?.length!==0 && provinceList.map((item, index) => {
                          return(
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                          )
                        })
                      }
                      
                    </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                  <FormControl sx={{ m: 0, minWidth: 500 }}>
                    <h6>Quận/Huyện *</h6>
                    <Select
                      size="small"
                      maxwidth
                      value={provinceData}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        provinceList?.length!==0 && provinceList.map((item, index) => {
                          return(
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                          )
                        })
                      }
                      
                    </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                  <FormControl sx={{ m: 0, minWidth: 500 }}>
                    <h6>Phường/Xã *</h6>
                    <Select
                      size="small"
                      maxwidth
                      value={provinceData}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        provinceList?.length!==0 && provinceList.map((item, index) => {
                          return(
                            <MenuItem value={item.name}>{item.name}</MenuItem>
                          )
                        })
                      }
                      
                    </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                  <FormControl sx={{ m: 0, minWidth: 500 }}>
                    <h6>Địa chỉ/ Thôn *</h6>
                    <TextField
                      displayEmpty
                      variant="outlined"
                      size="small"
                      required="true"
                    />
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4"></div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
