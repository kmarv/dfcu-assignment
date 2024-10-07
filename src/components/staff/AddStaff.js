import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Nav from "../Nav";
import { toast, ToastContainer } from "react-toastify";
import { apiRequestWithImage } from "../../common/common";
import { API_BASE_URL } from "../../common/constants";
import imageCompression from "browser-image-compression";
import GenerateAuthCode from "./GenerateAuthCode"; // Import the new component
import { useNavigate } from "react-router-dom";

function AddStaff() {
    const navigate = useNavigate()
  const [step, setStep] = useState(1); // Track which step we're on
  const [formData, setFormData] = useState({
    surname: "",
    other_names: "",
    dob: "",
    id_photo: null,
    auth_code: "", // Will be filled in after generating code
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // Handle image compression and file changes
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [];

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 800, // Maximum width or height
            useWebWorker: true, // Use multi-threading for better performance
          };

          // Compress the image
          const compressedFile = await imageCompression(file, options);
          const previewURL = URL.createObjectURL(compressedFile);

          updatedImages.push({ file: compressedFile, previewURL });

          if (index === files.length - 1) {
            setFormData((prevState) => ({
              ...prevState,
              id_photo: compressedFile, // Only use the first image in this case
            }));
          }
        } catch (error) {
          console.error("Error while compressing the image:", error);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle form submission for the final form
  const onFinish = () => {
    if (!formData.id_photo) {
      toast.error("Please upload an ID photo before submitting!");
      return;
    }

    const onSuccess = (response) => {
      toast.success(response.message);
      setFormData({
        surname: "",
        other_names: "",
        dob: "",
        id_photo: null,
        auth_code: "",
      });
      navigate('/staff');
    };
    const onError = (error) => {
      toast.error(error.response.data.message || "Error Occurred");
    };

    const data = new FormData();
    data.append("surname", formData.surname);
    data.append("other_names", formData.other_names);
    data.append("dob", formData.dob);
    data.append("auth_code", formData.auth_code);
    data.append("id_photo", formData.id_photo);

    apiRequestWithImage(
      "post",
      `${API_BASE_URL}staff/register`,
      data,
      "",
      onSuccess,
      onError
    );
  };

  // Handle moving to the next step after generating the auth code
  const handleProceed = () => {
    setStep(2);
  };

  return (
    <Nav>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {step === 1 ? (
            <GenerateAuthCode
              onProceed={handleProceed}
              setFormData={setFormData} // Pass the setter for the form data
            />
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
                Add Staff
              </h2>

              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Surname" required>
                  <Input
                    name="surname"
                    placeholder="Enter Surname"
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData({ ...formData, surname: e.target.value })
                    }
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item label="Other Names" required>
                  <Input
                    name="other_names"
                    placeholder="Enter Other Names"
                    value={formData.other_names}
                    onChange={(e) =>
                      setFormData({ ...formData, other_names: e.target.value })
                    }
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item label="Date of Birth" required>
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(date, dateString) =>
                      setFormData({ ...formData, dob: dateString })
                    }
                    className="rounded-md"
                  />
                </Form.Item>
                {/* Auth Code */}
                <Form.Item label="Auth Code" required>
                  <Input
                    name="auth_code"
                    placeholder="Enter Auth Code"
                    value={formData.auth_code}
                    onChange={handleInputChange}
                    className="rounded-md"
                  />{" "}
                </Form.Item>

                <Form.Item label="ID Photo">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => handleImageChange(e)}
                  />
                  {formData.id_photo && (
                    <img
                      src={URL.createObjectURL(formData.id_photo)}
                      alt="Preview"
                      style={{ width: "100px", marginTop: "10px" }}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bg-gradient-to-r from-sky-600 to-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </Nav>
  );
}

export default AddStaff;
