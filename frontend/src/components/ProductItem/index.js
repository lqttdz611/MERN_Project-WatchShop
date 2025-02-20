import Rating from "@mui/material/Rating";
import { TfiFullscreen } from "react-icons/tfi";
import { Button } from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { fetchDataFromAPI, postDataSign } from "../../utils/api";
import { FaHeartCircleCheck } from "react-icons/fa6";
const ProductItem = (props) => {
  const context = useContext(MyContext);
  const [listItemData, setListItemData] = useState([]);
  const viewProductDetail = (id) => {
    context.setIsOpenProductModal(true);
  };
  const addToWhishList = (id) => {
    // e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== undefined && user !== null && user !== "") {
      const data = {
        productTitle: props?.dataProduct?.name,
        image: props?.dataProduct?.images[0],
        rating: props?.dataProduct?.rating,
        price: props?.dataProduct?.price,
        productId: props?.dataProduct?.id,
        userId: user?.userId,
      };

      postDataSign(`/api/my-list/add`, data).then((res) => {
        if (res.status !== false) {
          context.setAlertBox({
            msg: "Product is added to the CART",
            error: false,
            open: true,
          });
          setTimeout(() => {
            alert("Added to whishlist");
          }, 2000);
        } else {
          context.setAlertBox({
            msg: res.msg,
            error: true,
            open: true,
          });
          setTimeout(() => {
            alert("added to whishlist fail");
          }, 1000);
        }
      });
      // console.log("data to add: ", data);
    } else {
      alert("Please login to add Whishlist");
    }
  };

  const [isAddedList, setIsAddedList] = useState(false);
  const handleMouseEnter = (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromAPI(
      `/api/my-list?productId=${id}&userId=${user?.userId}`
    ).then((res) => {
      // alert(id);
      if (res.length !== 0) {
        setIsAddedList(true);
      }
    });
  };

  return (
    <>
      <div
        className={`productItem ${props.itemView}`}
        onMouseEnter={() =>
          handleMouseEnter(
            props?.itemView === "recentlyView"
              ? props?.dataProduct?.recentId
              : props?.dataProduct?.id
          )
        }
      >
        <div className="imgWrapper">
          <Link to={`/product/${props?.dataProduct?._id}`}>
            <img src={props?.dataProduct?.images[0]} className="w-100"></img>
          </Link>
          <span className="badge badge-primary">
            {props?.dataProduct?.discount}%
          </span>
          <div className="actions">
            <Button /* onClick={() => viewProductDetail(1)}*/>
              <TfiFullscreen />
            </Button>
            <Button onClick={() => addToWhishList(props?.itemView === 'recentlyView' ? props?.dataProduct?.recentId : props?.dataProduct?.id)}>
              {
                isAddedList === true ? <FaHeartCircleCheck style={{ fontSize: "20px" }} /> : <IoMdHeartEmpty style={{ fontSize: "20px" }} />
              }
            </Button>
          </div>
        </div>
        <div className="info">
          <h4>{props?.dataProduct?.name}</h4>
          <span className="text-success d-block">{`${
            props?.dataProduct?.countInStock >= 1
              ? "In stock (" + props?.dataProduct?.countInStock + ")"
              : "Sold out"
          } `}</span>
          <Rating
            className="mt-2 mb-2"
            name="read-only"
            value={props?.dataProduct?.rating}
            size="small"
            precision={0.5}
            readOnly
          />
          <div className="d-flex">
            <span className="oldPrice ">${props?.dataProduct?.oldPrice}</span>
            <span className="netPrice text-danger ml-2">
              ${props?.dataProduct?.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
