import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../../common/constants";
import { apiRequest } from "../../common/common";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation:""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update the corresponding field
    setErrorMessage({ ...errorMessage, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is Required";
    }
     if (!formData.password_confirmation) {
       newErrors.password_confirmation = "Please Confirm Password";
     }
     if (formData.password !== formData.password_confirmation) {
       newErrors.password_confirmation = "Passwords don't match";
     }

    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  console.log(formData)

  const handleRegister = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    const data = JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    });

    const onSuccess = () => {
      toast.success("User account created successfully!");
      const navigateAfterDelay = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/");
      };
      navigateAfterDelay();
    };

    const onError = (error) => {
      toast.error("Error Occurred During Registration");
      setLoading(false);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Check if there are validation errors and set them in state
        if (errorData.errors) {
          setErrorMessage((prevErrors) => ({
            ...prevErrors,
            ...errorData.errors,
          }));
        } else {
          toast.error(errorData.message);
        }
      }
    };
;

    apiRequest(
      "post",
      `${API_BASE_URL}auth/register`,
      data,
      "",
      onSuccess,
      onError
    );
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            DFCU HR Sign Up
          </h4>
          <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Enter your details to register User Account.
          </p>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent focus:outline-0 ${
                    errorMessage.name && "border-red-500"
                  }`}
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  type="text"
                />
                {errorMessage.name && (
                  <span className="text-xs text-red-500 mt-2">
                    {errorMessage.name}
                  </span>
                )}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-sky-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Name
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent focus:outline-0"
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-sky-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent focus:outline-0  ${
                    errorMessage.password && "border-red-500"
                  }`}
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.password}
                />
                {errorMessage.password && (
                  <span className="text-xs text-red-500 mt-2">
                    {errorMessage.password}
                  </span>
                )}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-sky-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  id="password"
                  name="password_confirmation"
                  type="password"
                  className={`peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-500 focus:border-t-transparent focus:outline-0  ${
                    errorMessage.password_confirmation && "border-red-500"
                  }`}
                  placeholder=" "
                  onChange={handleChange}
                  value={formData.password_confirmation}
                />
                {errorMessage.password_confirmation && (
                  <span className="text-xs text-red-500 mt-2">
                    {errorMessage.password_confirmation}
                  </span>
                )}
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-sky-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-sky-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-sky-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Repeat Password
                </label>
              </div>
            </div>
            <button
              className="mt-6 block w-full select-none rounded-lg bg-sky-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-sky-500/20 transition-all hover:shadow-lg hover:shadow-sky-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              data-ripple-light="true"
              onClick={handleRegister}
              // disabled={loading} // Disable the button when loading is true
            >
              {loading ? (
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div> // CSS loader
              ) : (
                "Register"
              )}
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-sky-600 transition-colors hover:text-sky-700"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;
