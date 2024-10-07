import { Modal } from "antd";
import React from "react";

function ViewModal({ staff, open, setOpen }) {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onCancel={handleCancel}
        centered
      >
        <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700">
          <div className="w-full max-w-xs bg-white rounded-lg shadow-2xl transform transition duration-300 hover:scale-105 p-6 relative overflow-hidden">
            {/* Decorative Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-500 opacity-20"></div>

            {/* ID Photo with subtle animation */}
            <div className="flex justify-center mb-6 relative z-10">
              <img
                src={`data:${staff?.id_photo_mime_type};base64,${staff?.id_photo}`}
                alt="ID Pic"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg transition duration-300 hover:shadow-xl"
              />
            </div>

            {/* Name and Info */}
            <div className="text-center relative z-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-wide">
                {staff?.surname} {staff?.other_names}
              </h2>
              <p className="text-sm text-gray-600 italic mb-2">
                D.O.B: {staff?.dob}
              </p>
              <p className="text-sm text-gray-600 italic mb-4">
                Employee Number: {staff?.employee_number}
              </p>

              {/* Divider with styling */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Additional Information */}
              <div className="text-left space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-blue-600">Department:</span>{" "}
                  HR
                </p>
                <p className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-blue-600">Position:</span>{" "}
                  Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewModal;
