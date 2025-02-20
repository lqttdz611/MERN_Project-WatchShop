import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../utils/api";

const QuantityBox = (props) => {

  const [inputValue, setInputValue] = useState(1);

  useEffect(()=> {
    if(props?.value!==undefined && props?.value!== null && props?.value!==""  ) {
      setInputValue(parseInt(props?.value))
    }
  },[props.value])
  
  const plusValue = () => {
    setInputValue(inputValue + 1);
  }
  const minusValue = () => {
    if(inputValue>1) setInputValue(inputValue-1);

  }
  

  useEffect(() => {
    props.quantity(inputValue)
    props.selectedItem(props.item, inputValue);
  },[inputValue])
  return (
    <>
      <div className="quantityDrop d-flex align-items-center ">
        <Button onClick={minusValue}>
          <LuMinus />
        </Button>
        <input type="text" value={inputValue}></input>
        <Button onClick={plusValue}>
          <LuPlus />
        </Button>
      </div>
    </>
  );
};

export default QuantityBox;
