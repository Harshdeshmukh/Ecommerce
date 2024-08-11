import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import { useEffect,} from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
export default function ProductList() {
  const dispatch=useDispatch();
  const products=useSelector((state)=>state.product.products);

  useEffect(()=>{
    getProducts(dispatch);
  },[dispatch])


  const handleDelete = (id) => {
    deleteProduct(id,dispatch)
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200,
    renderCell: (params)=>{return(params.row.inStock?"Yes":"NO");}
  },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <div>
            <Tooltip  title="Edit" placement="top">
          <Link to={"/product/" + params.row._id}>
              <EditIcon className="productListEdit"/>
            </Link>
            </Tooltip>
            <Tooltip  title="Delete" placement="top">
            <DeleteIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
            </Tooltip>
          </div>
            
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productListTitleContainer">
        <h1 className="productTitle">Products</h1>
        <Link to="/newproduct" style={{ textDecoration: "none" }}>
          <Button
            className="productAddButton"
            startIcon={<AddCircleIcon/>}
            variant="contained"
          >
            AddProduct
          </Button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[6, 8, 12]}
        checkboxSelection
      />
    </div>
  );
}
