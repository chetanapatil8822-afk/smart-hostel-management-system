// src/pages/StudentDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  // Popups / modals
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState("");

  const [showPayModal, setShowPayModal] = useState(false);
  const [feeAmount, setFeeAmount] = useState("");

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomRequestType, setRoomRequestType] = useState("");
  const [roomReason, setRoomReason] = useState("");

  const [notification, setNotification] = useState("");

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInput, setContactInput] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userId = parseInt(localStorage.getItem("userId"));
    if (role !== "Student") navigate("/login");
    else {
      const s = users.find(u => u.id === userId);
      if (!s.complaints) s.complaints = [];
      if (!s.contact) s.contact = "9876543210"; // default demo contact
setStudent({ ...s });
setContactInput(s.contact);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // === Fees Payment ===
  const handlePayFees = () => {
    const amount = parseInt(feeAmount);
    if (isNaN(amount) || amount <= 0 || amount > ((student.totalFee || 5000) - (student.paidFee || 0))) {
      alert("Enter valid amount within due!");
      return;
    }

    setStudent(prev => ({
      ...prev,
      paidFee: (prev.paidFee || 0) + amount
    }));
    setFeeAmount("");
    setShowPayModal(false);
    setNotification(`₹${amount} paid successfully!`);
    setTimeout(() => setNotification(""), 3000);
  };

  // === Submit Complaint ===
  const handleSubmitComplaint = () => {
    if (!newComplaint) return alert("Enter complaint!");
    const today = new Date().toLocaleDateString();
    setStudent(prev => ({
      ...prev,
      complaints: [...prev.complaints, { issue: newComplaint, date: today, status: "Pending" }]
    }));
    setNewComplaint("");
    setShowComplaintForm(false);
    setNotification("Complaint submitted!");
    setTimeout(() => setNotification(""), 3000);
  };

  // === Room Request ===
  const handleRoomRequest = () => {
    if (!roomReason) return alert("Enter reason!");
    setShowRoomModal(false);
    setNotification(`Room ${roomRequestType} request submitted!`);
    setRoomReason("");
    setTimeout(() => setNotification(""), 3000);
  };

  if (!student) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      {/* Notification popup */}
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

{/* Profile + Hostel + Room cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

  {/* Name Card */}
  <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 shadow-xl rounded-2xl hover:scale-105 transition">
    <div className="flex items-center gap-3 mb-2 text-gray-700">
      
      {/* Icon */}
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-70">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
      </svg>

      <h2 className="text-lg font-semibold">Name</h2>
    </div>

    <p className="text-2xl font-bold text-indigo-600">{student.name}</p>
  </div>

  {/* Contact Card */}
  <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 shadow-xl rounded-2xl hover:scale-105 transition">
    
    <div className="flex justify-between items-center mb-2">
      
      <div className="flex items-center gap-3 text-gray-700">
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-70">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
          19.79 19.79 0 0 1-8.63-3.07 
          19.5 19.5 0 0 1-6-6 
          19.79 19.79 0 0 1-3.07-8.67 
          A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 
          c.12.89.37 1.76.72 2.6 
          a2 2 0 0 1-.45 2.11L8.09 9.91 
          a16 16 0 0 0 6 6l1.48-1.48 
          a2 2 0 0 1 2.11-.45 
          c.84.35 1.71.6 2.6.72 
          A2 2 0 0 1 22 16.92z"/>
        </svg>

        <h2 className="text-lg font-semibold">Contact</h2>
      </div>

      <button
        onClick={() => setShowContactModal(true)}
        className="text-blue-600 hover:underline text-sm"
      >
        Edit
      </button>
    </div>

    <p className="text-2xl font-bold text-indigo-600">{student.contact}</p>
  </div>

  {/* Hostel Card */}
  <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 shadow-xl rounded-2xl hover:scale-105 transition">
    
    <div className="flex items-center gap-3 mb-2 text-gray-700">
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-70">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
      </svg>

      <h2 className="text-lg font-semibold">Hostel</h2>
    </div>

    <p className="text-2xl font-bold text-indigo-600">{student.hostel}</p>
  </div>

  {/* Room Card */}
  <div className="bg-white/40 backdrop-blur-lg border border-white/30 p-6 shadow-xl rounded-2xl hover:scale-105 transition">
    
    <div className="flex items-center gap-3 mb-2 text-gray-700">
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="opacity-70">
        <path d="M3 21h18"/>
        <path d="M7 21V3h10v18"/>
        <circle cx="14" cy="12" r="0.5" fill="currentColor"/>
      </svg>

      <h2 className="text-lg font-semibold">Room</h2>
    </div>

    <p className="text-2xl font-bold text-indigo-600">{student.room}</p>
  </div>

</div>

      {/* Fees Section */}
      <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Fees Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 mb-4">
          <div className="p-4 bg-indigo-50 rounded-lg text-center transform hover:scale-105 transition">
            <h3 className="font-medium">Total</h3>
            <p className="text-2xl font-bold">₹{student.totalFee || 5000}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg text-center transform hover:scale-105 transition">
            <h3 className="font-medium">Paid</h3>
            <p className="text-2xl font-bold">₹{student.paidFee || 3000}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg text-center transform hover:scale-105 transition">
            <h3 className="font-medium">Due</h3>
            <p className="text-2xl font-bold">{(student.totalFee || 5000) - (student.paidFee || 3000)}</p>
          </div>
        </div>

        {/* Pay Fees Button */}
        <button
  onClick={() => setShowPaymentModal(true)}
  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
>
  Pay Fees
</button>

        {/* Pay Fees Modal */}
        {showPaymentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white w-96 p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">Pay Fees</h2>

      {/* Payment Options */}
      <div className="flex justify-between mb-4">
        {["UPI", "Card", "NetBanking"].map((method) => (
          <button
            key={method}
            onClick={() => setPaymentMethod(method)}
            className={`px-3 py-2 rounded-lg border ${
              paymentMethod === method
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {method}
          </button>
        ))}
      </div>

      {/* Dynamic Form */}
      {paymentMethod === "UPI" && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          className="w-full p-2 border rounded mb-3"
        />
      )}

      {paymentMethod === "Card" && (
        <>
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 p-2 border rounded"
            />
          </div>
        </>
      )}

      {paymentMethod === "NetBanking" && (
        <select className="w-full p-2 border rounded mb-3">
          <option>Select Bank</option>
          <option>SBI</option>
          <option>HDFC</option>
          <option>ICICI</option>
        </select>
      )}

      {/* Pay Button */}
      <button
        onClick={() => {
          setProcessing(true);

          setTimeout(() => {
            setProcessing(false);
            setShowPaymentModal(false);

            setStudent(prev => ({
              ...prev,
              paidFee: prev.totalFee
            }));

            setNotification("✅ Payment Successful!");
            setTimeout(() => setNotification(""), 3000);
          }, 2000);
        }}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>

      {/* Cancel */}
      <button
        onClick={() => setShowPaymentModal(false)}
        className="w-full mt-2 border py-2 rounded-lg"
      >
        Cancel
      </button>

    </div>
  </div>
)}
</div>

      {/* Complaints Section */}
      <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Raise Complaint</h2>
        <button
          onClick={() => setShowComplaintForm(!showComplaintForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4"
        >
          {showComplaintForm ? "Cancel" : "New Complaint"}
        </button>

        {showComplaintForm && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Describe your issue"
              value={newComplaint}
              onChange={(e) => setNewComplaint(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <button
              onClick={handleSubmitComplaint}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </div>
        )}

        {/* Complaints Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Issue</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {student.complaints.length > 0 ? (
              student.complaints.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-100 transition">
                  <td className="p-2 border">{c.issue}</td>
                  <td className="p-2 border">{c.date}</td>
                  <td className={`p-2 border font-semibold ${c.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                    {c.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No complaints submitted
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showContactModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
      <h3 className="text-lg font-bold mb-4">Edit Contact Number</h3>

      <input
        type="text"
        value={contactInput}
        onChange={(e) => setContactInput(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowContactModal(false)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setStudent(prev => ({
              ...prev,
              contact: contactInput
            }));
            setShowContactModal(false);
            setNotification("Contact updated successfully!");
            setTimeout(() => setNotification(""), 3000);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {/* Room Actions */}
      <div className="bg-white p-6 shadow-lg rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Room Actions</h2>
        <div className="flex gap-4">
          <button
            onClick={() => { setRoomRequestType("Change"); setShowRoomModal(true); }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Apply for Room Change
          </button>
          <button
            onClick={() => { setRoomRequestType("Vacate"); setShowRoomModal(true); }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Vacate Room
          </button>
        </div>

        {/* Room Request Modal */}
        {showRoomModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 animate-fade-in">
              <h3 className="text-lg font-bold mb-4">{roomRequestType} Room Request</h3>
              <textarea
                placeholder="Enter reason"
                value={roomReason}
                onChange={(e) => setRoomReason(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowRoomModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRoomRequest}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;