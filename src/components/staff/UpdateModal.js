import { Modal, Form, Input, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression"; // Ensure this is imported
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiRequestWithImage } from "../../common/common";
import { API_BASE_URL } from "../../common/constants";

function UpdateModal({ open, setOpen, staff }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [idPhotoBase64, setIdPhotoBase64] = useState(""); // State to hold the base64 string of the image

  useEffect(() => {
    if (open && staff) {
      // Set form values
      form.setFieldsValue({
        dob: staff.dob,
        id_photo: staff.id_photo, // This can be used if you need it in the form
      });
      // Create a preview URL for the existing image
      const initialPreview = `data:${staff.id_photo_mime_type};base64,${staff.id_photo}`;
      setImagePreview(initialPreview);
      setIdPhotoBase64(initialPreview); // Store initial base64
    }
  }, [open, staff, form]);

  const handleSubmit = async (values) => {
    const onSuccess = (response) => {
      toast.success(response.message);
      setOpen(false);
      navigate("/staff");
    };

    const onError = (error) => {
      toast.error(error.response?.data?.message || "Error Occurred");
    };

    const data = new FormData();

    data.append("dob", values.dob); // Use dob from form values
    if (idPhotoBase64) {
      const response = await fetch(idPhotoBase64);
      const blob = await response.blob();
      data.append("id_photo", blob, "id_photo.jpg"); // Append the compressed image blob
    }

    apiRequestWithImage(
      "put",
      `${API_BASE_URL}staff/${staff.employee_number}`,
      data,
      "",
      onSuccess,
      onError
    );
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFileChange = (file) => {
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

        // Update state with new image
        setIdPhotoBase64(previewURL); // Use preview URL as base64 representation
        setImagePreview(previewURL); // Update the image preview
      } catch (error) {
        console.error("Error while compressing the image:", error);
      }
    };

    reader.readAsDataURL(file); // Read the file as data URL
  };

  const handleDeleteImage = () => {
    setImagePreview(null); // Clear the image preview
    setIdPhotoBase64(""); // Clear the base64 string
    form.setFieldsValue({ id_photo: "" }); // Clear the form field if needed
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      title="Update Staff Information"
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            { required: true, message: "Please select your date of birth!" },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item label="ID Photo" name="id_photo">
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              handleFileChange(file); // Pass the file to handleFileChange
              return false; // Prevent auto-upload
            }}
          >
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="ID Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
                <Button
                  type="link"
                  onClick={handleDeleteImage}
                  style={{ marginTop: "10px" }}
                >
                  Delete Image
                </Button>
              </div>
            ) : (
              <Button>Upload ID Photo</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateModal;
