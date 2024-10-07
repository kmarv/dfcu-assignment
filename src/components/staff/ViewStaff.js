import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import { toast } from "react-toastify";
import { apiRequest } from "../../common/common";
import { API_BASE_URL } from "../../common/constants";
import { Button, Space, Table, Input } from "antd";
import moment from "moment"; // for calculating age
import ViewModal from "./ViewModal";
import UpdateModal from "./UpdateModal";

function ViewStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState(""); // State to hold the employee number

  // Fetch staff with an optional employee number parameter
  const fetchStaff = (emp) => {
    setLoading(true);

    const onSuccess = (response) => {
      toast.success(response.message);
      // Check if response.staff is an array
      if (Array.isArray(response.staff)) {
        setStaff(response.staff); // Set staff if it's an array
      } else if (typeof response.staff === "object") {
        // If it's an object, push it into an array
         response.staff !== null  ? setStaff([response.staff]) : setStaff([]); // Wrap the object in an array
      } else {
        // Handle unexpected response types
        toast.error("Unexpected response format.");
        setStaff([]); // Set to empty array
      }
      setLoading(false);
    };

    const onError = (error) => {
      toast.error(error.message);
      setLoading(false);
    };

    

    let params = {
      employee_number: employeeNumber,
    };

    apiRequest("get", `${API_BASE_URL}staff`, "", params, onSuccess, onError);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle the input change for employee number
  const handleEmployeeNumberChange = (e) => {
    setEmployeeNumber(e.target.value);
  };

  // Handle the search by employee number
  const handleSearch = () => {
    fetchStaff(employeeNumber); // Fetch staff with the provided employee number
  };

  const handleReset = () => {
    fetchStaff(); // Fetch staff with the provided employee number
  };


  // Handle View action
  const handleView = (record) => {
    setSelectedStaff(record);
    setOpenViewModal(true);
  };


  // Handle Update action
  const handleUpdate = (record) => {
       setSelectedStaff(record);
setOpenUpdateModal(true)
  };

  // Table columns
  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Other Names",
      dataIndex: "other_names",
      key: "other_names",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Employee Number",
      dataIndex: "employee_number",
      key: "employee_number",
    },
    {
      title: "Actions",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="default" onClick={() => handleUpdate(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  console.log(staff)

  return (
    <div>
      <Nav>
        <div>
          <h1>Enrolled Staff</h1>

          {/* Employee Number Filter */}
          <div className="mb-4">
            <Input
              placeholder="Enter Employee Number"
              value={employeeNumber}
              onChange={handleEmployeeNumberChange}
              style={{ width: 300, marginRight: 10 }}
            />
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button type="primary" className="m-2" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {loading ? (
            <div>
              <div className="p-4">
                <div className="w-full border border-gray-300 rounded-lg shadow-sm">
                  <div className="animate-pulse">
                    {/* Table header skeleton */}
                    <div className="flex p-3 border-b bg-gray-100">
                      <div className="w-1/6 h-4 bg-gray-300 rounded"></div>
                      <div className="w-1/6 h-4 bg-gray-300 rounded ml-4"></div>
                      <div className="w-1/6 h-4 bg-gray-300 rounded ml-4"></div>
                      <div className="w-1/6 h-4 bg-gray-300 rounded ml-4"></div>
                      <div className="w-1/6 h-4 bg-gray-300 rounded ml-4"></div>
                    </div>

                    {/* Table rows skeleton */}
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex p-3 border-b">
                        <div className="w-1/6 h-6 bg-gray-200 rounded"></div>
                        <div className="w-1/6 h-6 bg-gray-200 rounded ml-4"></div>
                        <div className="w-1/6 h-6 bg-gray-200 rounded ml-4"></div>
                        <div className="w-1/6 h-6 bg-gray-200 rounded ml-4"></div>
                        <div className="w-1/6 h-6 bg-gray-200 rounded ml-4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={staff}
              className=" whitespace-nowrap"
              scroll={{ x: true, y: 700 }}
              rowKey="id"
              pagination={{ position: "bottom", pageSize: 50 }}
            />
          )}
        </div>
      </Nav>
      <ViewModal
        staff={selectedStaff}
        open={openViewModal}
        setOpen={setOpenViewModal}
      />
      <UpdateModal
        staff={selectedStaff}
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
      />
    </div>
  );
}

export default ViewStaff;
