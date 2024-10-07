import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Nav from "../Nav";
import { CopyOutlined } from "@ant-design/icons";
import { apiRequest } from "../../common/common";
import { API_BASE_URL } from "../../common/constants";

function GenerateAuthCode({ onProceed }) {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission to generate auth code
  const handleSubmit = async () => {
    const onSuccess = (response) => {
      setAuthCode(response.code);
      toast.success("Auth code generated successfully!");
    };

    const onError = (error) => {
      let errorMessage = "Error generating auth code!";

      if (error.response && error.response.data) {
        // Extract and format error messages from response.data
        const errors = error.response.data;
        errorMessage = Object.keys(errors)
          .map((field) => `${field}: ${errors[field].join(", ")}`)
          .join("\n");
      }
      toast.error(`Error: ${errorMessage}`);
    };
    let data = {
      email:email
    }

    apiRequest(
      "post",
      `${API_BASE_URL}auth-code/generate`,
      data,
      "",
      onSuccess,
      onError
    );
  };

  // Handle copying to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(authCode);
    message.success("Auth code copied to clipboard!");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
            Generate Auth Code
          </h2>

          <Form layout="vertical" onFinish={handleSubmit}>
            {/* Email Input */}
            <Form.Item label="Email" required>
              <Input
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                className="rounded-md"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-sky-600 to-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Generate Code
              </Button>
            </Form.Item>
          </Form>

          {/* Display Auth Code and Copy to Clipboard */}
          {authCode && (
            <div className="mt-4">
              <p>
                Your Auth Code:{" "}
                <strong className="text-sky-700">{authCode}</strong>
              </p>
              <Button
                icon={<CopyOutlined />}
                onClick={copyToClipboard}
                className="mt-2"
              >
                Copy Code
              </Button>
              <Button
                type="primary"
                onClick={onProceed} // Proceed to the next form
                className="mt-4 w-full"
              >
                Proceed
              </Button>
            </div>
          )}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default GenerateAuthCode;
