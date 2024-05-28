

import React, { useEffect, useState } from "react";
import Products_Left_Top_Logo from "../../../Assets/Products_Left_Top_Logo.svg";
import Credits from "../../../Assets/Credits.svg";
import Profile from "../../../Assets/Profile.svg";
import { Link, Navigate } from "react-router-dom";
import Edit from "../../../Assets/Edit.svg";
import Delete from "../../../Assets/Delete.svg";
import CustomDropdown from "./CustomDropdown"; // Import the new component
import "./Products.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
    const navigate = useNavigate();
    const [Data, setData] = useState([]);
    useEffect(() => { 
        const data = async () => {
            try {
                const response = await axios.get("http://localhost:8000/contests");
                console.log("Data fetched: ", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
            }

        data();
    }, []);
    // console.log("Res: ", res)
    // const [data] = useState(res);
    // console.log("Data: ", [data])

    // const [data] = useState([
    //   {
    //     id: 1,
    //     name: "Product 1",
    //     status: "Active",
    //     created_on: "2021-09-01 9:28 AM",
    //   },
    //   {
    //     id: 2,
    //     name: "Product 2",
    //     status: "Inactive",
    //     created_on: "2021-09-02 9:28 AM",
    //   },
    //   {
    //     id: 3,
    //     name: "Product 3",
    //     status: "Active",
    //     created_on: "2021-09-03 9:28 AM",
    //   },
    //   {
    //     id: 4,
    //     name: "Product 4",
    //     status: "Inactive",
    //     created_on: "2021-09-04 9:28 AM",
    //   },
    //   {
    //     id: 5,
    //     name: "Product 5",
    //     status: "Active",
    //     created_on: "2021-09-05 9:28 AM",
    //   },
    //   {
    //     id: 6,
    //     name: "Product 6",
    //     status: "Inactive",
    //     created_on: "2021-09-06 9:28 AM",
    //   },
    //   {
    //     id: 7,
    //     name: "Product 7",
    //     status: "Active",
    //     created_on: "2021-09-07 9:28 AM",
    //   },
    //   {
    //     id: 8,
    //     name: "Product 8",
    //     status: "Inactive",
    //     created_on: "2021-09-08 9:28 AM",
    //   },
    //   {
    //     id: 9,
    //     name: "Product 9",
    //     status: "Active",
    //     created_on: "2021-09-09 9:28 AM",
    //   },
    //   {
    //     id: 10,
    //     name: "Product 10",
    //     status: "Inactive",
    //     created_on: "2021-09-10 9:28 AM",
    //   },
    // ]);



  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const filterData = () => {
    return Data.filter((item) => {
      const itemDate = new Date(item.createdDate);
      const isWithinDateRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);
      const isStatusMatch =
        statusFilter === "All" || item.contestStatus === statusFilter;

      return isWithinDateRange && isStatusMatch;
    });
  };

  const filteredData = filterData();

      const contests = () =>{
        navigate('/contests'); 
    }

  return (
    <div className="Container-Products">
      <div className="Products-Heading">
        <img
          src={Products_Left_Top_Logo}
          alt="Products_Left_top_Logo"
          className="Products-Heading-Left-Top-Logo"
        />
        <div className="Products-Heading-Right">
          <div className="Products-Heading-Credits">
            <img src={Credits} alt="Credits" />
            <div className="Total-Credits">87645</div>
          </div>
          <div className="Products-Heading-Admin">
            <img src={Profile} alt="Admin" />
            <div className="Admin">Admin</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="Product-Operations">
        <div className="Product-Operations-Text">Products</div>
        <div className="Product-Operations-Right">
          <div className="Product-Operations-Right-Search">
            <input
              type="text"
              name="Search Product"
              id=""
              placeholder="Search Product"
            />
          </div>
          <CustomDropdown
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
            statusFilter={statusFilter}
            handleStatusChange={handleStatusChange}
          />
          <div className="Product-Operations-Right-Export">
            <button>Export</button>
          </div>
          <div className="Product-Operations-Right-Contest">
            <button onClick={contests}>Add Contest</button>
          </div>
          <div className="Product-Operations-Right-Bulk-Product">
            <button>Bulk Product</button>
          </div>
        </div>
      </div>
      <div className="Products-SubHeading-Text">
        <div className="Products-SubHeading-Text-1">CREATED ON #</div>
        <div className="Products-SubHeading-Text-2">NAME #</div>
        <div className="Products-SubHeading-Text-3">STATUS #</div>
        <div className="Products-SubHeading-Text-4">ID #</div>
        <div></div>
      </div>
      <div className="Products-Body">
        {filteredData.map((item) => (
          <div key={item.id} className="Products-Body-Text">
            <div className="Products-Body-Text-1">{item.createdDate}</div>
            <div className="Products-Body-Text-2">{item.contestName}</div>
            <div className="Products-Body-Text-3">{item.contestStatus}</div>
            <div className="Products-Body-Text-4">{item.contestId}</div>
            <div className="Products-Body-Text-5">
              <Link className="Edit-Logo">
                {" "}
                <img src={Edit} alt="Edit" />
              </Link>
              <Link className="Delete-Logo">
                <img src={Delete} alt="Delete" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
