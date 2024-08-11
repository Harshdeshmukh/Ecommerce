import "./newProduct.css";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
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
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            category: cat,
            color: color,
            size: size,
          };
          addProduct(product, dispatch);
        });
      }
    );
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  console.log(size);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="leftFormContainer">
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              type="text"
              placeholder="Apple Airpods"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              placeholder="Description...."
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              type="Number"
              placeholder="20"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Category</label>
            <input
              type="text"
              placeholder="jeans,Men,Women"
              onChange={handleCategory}
            />
          </div>
          
        </div>
        <div className="centerFormContainer">
        <div className="addProductItem">
            <label>Size</label>
            <input
              type="text"
              placeholder="S,M,S,XL,XXL"
              onChange={handleSize}
            />
          </div>
          <div className="addProductItem">
            <label>Color</label>
            <input
              type="text"
              placeholder="green,red,blue"
              onChange={handleColor}
            />
          </div>
          <div className="addProductItem">
            <label>InStock</label>
            <select name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <button onClick={handleSubmit} className="addProductButton">
              Create
            </button>
          </div>
        </div>
        
        <div className="rightFormContainer">
          <div className="addProductItem ">
            <label>Image</label>
            <input
              accept="image/*"
              type="file"
              id="file"
              style={{ display: "none" }}
              multiple
              onChange={onSelectFile}
            />
            <span className="previewImageContainer">
              <label htmlFor="file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload
                </Button>
              </label>
              {selectedFile && (
                <img src={preview} alt={file.name} className="previewImage" />
              )}
            </span>
          </div>
          
        </div>
      </form>
    </div>
  );
}
