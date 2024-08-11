import { useHistory, useLocation } from "react-router-dom";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";
import { upadateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const history = useHistory();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const dispatch = useDispatch();
  const storage = getStorage(app);

  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategory = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(",").map((item) => item.toUpperCase()));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const deleteFile=async()=>{
    // Create a reference to the file to delete
    const desertRef = ref(storage, product.img);
    try {
      await deleteObject(desertRef);
      console.log("File Deleted SuccessFully");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const uploadFile=async()=>{

    const fileName = new Date().getTime() + file.name;
    const StorageRef = ref(storage, "products/" + fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
        return {state:false};
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product1 = {
            title: inputs?.title ? inputs.title : product.title,
            desc: inputs?.desc ? inputs.desc : product.desc,
            price: inputs?.price ? inputs.price : product.price,
            inStock: inputs?.inStock ? inputs.inStock : product.inStock,
            img: downloadURL,
            category: cat.length !==0 ? cat : product.category,
            color: color.length !==0 ? color : product.color,
            size: size.length !==0 ? size : product.size,
          };
          upadateProduct(productId, product1, dispatch);
        });
      }
    );
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
      const product1 = {
        title: inputs?.title ? inputs.title : product.title,
        desc: inputs?.desc ? inputs.desc : product.desc,
        price: inputs?.price ? inputs.price : product.price,
        inStock: inputs?.inStock ? inputs.inStock : product.inStock,
        img: product.img,
        category: cat.length !==0 ? cat : product.category,
        color: color.length !==0 ? color : product.color,
        size: size.length !==0 ? size : product.size,
      };
     await upadateProduct(productId, product1, dispatch);
    }
    else{
      const deleteImage= product.img ? await deleteFile():true;
      console.log(deleteImage);
      if(deleteImage){
         await uploadFile();
      }
    }
     
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getPStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPStats();
  }, [MONTHS, productId]);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <button onClick={() => history.goBack()} className="productBackButton">
          Back
        </button>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">price: </span>
              <span className="productInfoValue">{product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock: </span>
              <span className="productInfoValue">
                {product?.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              type="text"
              defaultValue={product?.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              name="desc"
              type="text"
              defaultValue={product?.desc}
              onChange={handleChange}
            />
            <label>Product Price</label>
            <input
              name="price"
              type="Number"
              defaultValue={product?.price}
              onChange={handleChange}
            />
            <label>Product Category</label>
            <input
              name="category"
              type="text"
              placeholder={product?.category.join(',')}
              onChange={handleCategory}
            />
            <label>Product Color</label>
            <input
              name="color"
              type="text"
              placeholder={product?.color.join(',')}
              onChange={handleColor}
            />
            <label>Product size</label>
            <input
              name="size"
              type="text"
              placeholder={product?.size.join(',')}
              onChange={handleSize}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="inStock"
              defaultValue={product?.inStock}
              onChange={handleChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.img} alt="" className="productUploadImg" />
              <label htmlFor="file" className="uploadIcon">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleSubmit} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
