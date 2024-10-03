// import React, { useContext, useState } from "react";
// import { FaUpload, FaCashRegister, FaMobileAlt } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../../context/AppContext";

// const PaymentModal = ({
//   isOpen,
//   onClose,
//   onPaymentSuccess,
//   selectedAppointmentId,
// }) => {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [file, setFile] = useState(null);
//   const { backendURL, token, getDoctorData } = useContext(AppContext);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("appointmentId", selectedAppointmentId);
//     formData.append("paymentMethod", paymentMethod);
//     if (file) {
//       formData.append("paymentProof", file);
//     }

//     console.log("Appointment ID:", selectedAppointmentId); // Log the appointment ID

//     // Log the FormData object
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ", " + pair[1]);
//     }

//     try {
//       const response = await axios.post(
//         backendURL + "/user/make-payment",
//         formData,
//         {
//           headers: {
//             token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(response);
//       if (response.data.success) {
//         onPaymentSuccess(paymentMethod);
//         onClose();
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to make payment");
//     }
//   };

//   return (
//     isOpen && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//           <h2 className="font-bold text-xl text-center mb-4">
//             Select Payment Method
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               {/* Jazzcash Option */}
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   value="Jazzcash"
//                   checked={paymentMethod === "Jazzcash"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 <FaMobileAlt className="mr-2 text-indigo-600" />
//                 <label className="text-lg">Jazzcash</label>
//                 {paymentMethod === "Jazzcash" && (
//                   <div className="mt-2">
//                     <label className="block text-sm text-gray-600 mb-1">
//                       Upload Payment Proof:
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       required
//                       className="border rounded p-2 w-full text-gray-700"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Easypaisa Option */}
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   value="Easypaisa"
//                   checked={paymentMethod === "Easypaisa"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 <FaCashRegister className="mr-2 text-indigo-600" />
//                 <label className="text-lg">Easypaisa</label>
//                 {paymentMethod === "Easypaisa" && (
//                   <div className="mt-2">
//                     <label className="block text-sm text-gray-600 mb-1">
//                       Upload Payment Proof:
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                       required
//                       className="border rounded p-2 w-full text-gray-700"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Cash Option */}
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   value="Cash"
//                   checked={paymentMethod === "Cash"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="mr-2"
//                 />
//                 <label className="text-lg">Cash</label>
//               </div>
//             </div>

//             <div className="flex justify-center mt-4">
//               <button
//                 type="submit"
//                 className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
//               >
//                 Pay
//               </button>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="ml-2 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default PaymentModal;

import React, { useContext, useState } from "react";
import { FaUpload, FaCashRegister, FaMobileAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const PaymentModal = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  selectedAppointmentId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [file, setFile] = useState(null);
  const { backendURL, token, getDoctorData } = useContext(AppContext);

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
        backendURL + "/user/make-payment",
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
        handleReset(); // Reset everything after payment success
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="font-bold text-xl text-center mb-4">
            Select Payment Method
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Jazzcash Option */}
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="Jazzcash"
                    checked={paymentMethod === "Jazzcash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <FaMobileAlt className="mr-2 text-indigo-600" />
                  <label className="text-lg">Jazzcash</label>
                </div>
                {paymentMethod === "Jazzcash" && (
                  <div className="mt-2 w-full">
                    <p className="text-sm text-gray-600">
                      <strong>Account Title:</strong> John Doe
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 1234567890
                    </p>
                    <label className="block text-sm text-gray-600 mb-1 mt-2">
                      Upload Payment Proof:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="border rounded p-2 w-full text-gray-700"
                    />
                    {file && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Payment Proof"
                          className="w-full h-32 object-contain border rounded-lg"
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
                    checked={paymentMethod === "Easypaisa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <FaCashRegister className="mr-2 text-indigo-600" />
                  <label className="text-lg">Easypaisa</label>
                </div>
                {paymentMethod === "Easypaisa" && (
                  <div className="mt-2 w-full">
                    <p className="text-sm text-gray-600">
                      <strong>Account Title:</strong> Jane Smith
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 0987654321
                    </p>
                    <label className="block text-sm text-gray-600 mb-1 mt-2">
                      Upload Payment Proof:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="border rounded p-2 w-full text-gray-700"
                    />
                    {file && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Payment Proof"
                          className="w-full h-32 object-contain border rounded-lg"
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
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label className="text-lg">Cash</label>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Pay
              </button>
              <button
                type="button"
                onClick={() => {
                  handleReset(); // Reset everything on cancel
                  onClose();
                }}
                className="ml-2 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
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
