import React, { useContext, useState } from "react";
import { FaUpload, FaCashRegister, FaMobileAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../public/assets/assets";
import { GiMoneyStack } from "react-icons/gi";

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  selectedAppointmentId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [file, setFile] = useState(null);
  const { backendURL, token } = useContext(AppContext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("appointmentId", selectedAppointmentId);
    formData.append("paymentMethod", paymentMethod);
    if (file) {
      formData.append("paymentProof", file);
    }

    try {
      const response = await axios.post(
        `${backendURL}/user/make-payment`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        onPaymentSuccess(paymentMethod);
        handleReset();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to make payment");
    }
  };

  const handleReset = () => {
    setPaymentMethod("");
    setFile(null);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <h2 className="font-bold text-xl text-center mb-6 text-gray-800">
            Select Payment Method
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* JazzCash Option */}
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="JazzCash"
                    id="jazzCash"
                    checked={paymentMethod === "JazzCash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <img
                    src={assets.Jazzcash}
                    alt="JazzCash Icon"
                    className="w-9"
                  />
                  <label
                    htmlFor="jazzCash"
                    className="text-lg cursor-pointer ml-2 text-gray-700"
                  >
                    JazzCash
                  </label>
                </div>
                {paymentMethod === "JazzCash" && (
                  <div className="mt-4 w-full">
                    <p className="text-sm text-gray-600">
                      <strong>Account Title:</strong> Abdul Ali
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 0305 2879926
                    </p>
                    <label className="block text-sm text-gray-600 mb-2 mt-4">
                      Upload Payment Proof:
                    </label>
                    <div className="relative border rounded-lg border-gray-300 p-2 w-full hover:border-indigo-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full cursor-pointer text-gray-700"
                      />
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <FaUpload className="text-gray-500" />
                      </div>
                    </div>
                    {file && (
                      <div className="mt-4">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Payment Proof"
                          className="w-full h-40 object-contain border rounded-lg mt-2"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Easypaisa Option */}
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="Easypaisa"
                    id="easypaisa"
                    checked={paymentMethod === "Easypaisa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <img
                    src={assets.Easypaisa}
                    alt="Easypaisa Icon"
                    className="w-9"
                  />
                  <label
                    htmlFor="easypaisa"
                    className="text-lg cursor-pointer ml-2 text-gray-700"
                  >
                    Easypaisa
                  </label>
                </div>
                {paymentMethod === "Easypaisa" && (
                  <div className="mt-4 w-full">
                    <p className="text-sm text-gray-600">
                      <strong>Account Title:</strong> Abdul Ali
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 0305 2879926
                    </p>
                    <label className="block text-sm text-gray-600 mb-2 mt-4">
                      Upload Payment Proof:
                    </label>
                    <div className="relative border rounded-lg border-gray-300 p-2 w-full hover:border-indigo-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full cursor-pointer text-gray-700"
                      />
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <FaUpload className="text-gray-500" />
                      </div>
                    </div>
                    {file && (
                      <div className="mt-4">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Payment Proof"
                          className="w-full h-40 object-contain border rounded-lg mt-2"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cash Option */}
              <div className="flex items-center">
                <input
                  type="radio"
                  value="Cash"
                  id="cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <span>
                  <GiMoneyStack />
                </span>
                <label
                  htmlFor="cash"
                  className="text-lg cursor-pointer ml-2 text-gray-700"
                >
                  Cash
                </label>
                {/* <label className="text-lg text-gray-700">Cash</label> */}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Pay
              </button>
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default PaymentModal;
