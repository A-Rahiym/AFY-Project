import React, { useState, useEffect } from "react";
import {
  getHostelDetails,
  checkBooking,
  bookAccommodation,
} from "../api/hostelApi";
import initialHostelOptions from "../data/hostelOptions.json";

import {
  BookingStatusChecker,
  HostelSelector,
  BlockSelector,
  RoomSelector,
  BookingButton,
  MessageDisplay,
  PaymentButton,
} from "../components";

const HostelAndRoomBooking = () => {
  // State management
  const [selectedHostelName, setSelectedHostelName] = useState("");
  const [hostelDetails, setHostelDetails] = useState(null);
  const [selectedBlockId, setSelectedBlockId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [message, setMessage] = useState(
    "Please select a hostel from the dropdown."
  );
  const [loading, setLoading] = useState(false);
  const [hasPaid, setHasPaid] = useState(false); // default to true to avoid flashing
  const [error, setError] = useState(null);
  const [isStudentBooked, setIsStudentBooked] = useState(false);
  const [checkingBookingStatus, setCheckingBookingStatus] = useState(true);

  // Authentication data
  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  // Check booking status on mount
  useEffect(() => {
    const fetchBookingStatus = async () => {
      if (!studentId || !token) {
        setIsStudentBooked(false);
        setCheckingBookingStatus(false);
        setMessage("Please log in to book accommodation.");
        return;
      }

      setCheckingBookingStatus(true);
      try {
        const response = await checkBooking(studentId, token);
        console.log("Response from checkBooking (frontend):", response);
        if (response.hasPaid) {
          setHasPaid(true);
        }
        if (response.isBooked) {
          setIsStudentBooked(true);
          setMessage(`You have already booked accommodation.`);
        } else {
          setIsStudentBooked(false);
          setMessage(
            "Please select a hostel from the dropdown to book your accommodation."
          );
        }
      } catch (err) {
        console.error("Error checking student booking status:", err);
        setError("Failed to load your booking status. Please try again.");
        setIsStudentBooked(false);
      } finally {
        setCheckingBookingStatus(false);
      }
    };

    fetchBookingStatus();
  }, [studentId, token]);

  // Fetch hostel details when hostel is selected
  useEffect(() => {
    const fetchSelectedHostelDetails = async () => {
      if (!selectedHostelName) {
        setHostelDetails(null);
        setSelectedBlockId("");
        setSelectedRoomId("");
        if (!isStudentBooked) {
          setMessage("Please select a hostel from the dropdown.");
        }
        return;
      }

      if (isStudentBooked) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setMessage(`Loading details for ${selectedHostelName}...`);

      try {
        const response = await getHostelDetails(selectedHostelName);
        setHostelDetails(response.hostel);
        setMessage(`Details for ${selectedHostelName} loaded.`);
      } catch (err) {
        console.error("Error fetching selected hostel details:", err);
        setError(
          err.response?.data?.error ||
            "Failed to load selected hostel details. Please try again."
        );
        setHostelDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (!checkingBookingStatus && !isStudentBooked) {
      fetchSelectedHostelDetails();
    }
  }, [selectedHostelName, checkingBookingStatus, isStudentBooked]);

  // Helper function to get rooms for selected block
  const getRoomsForCurrentBlock = () => {
    if (!hostelDetails || !selectedBlockId) {
      return [];
    }
    const block = hostelDetails.hostel_block.find(
      (b) => b.id === selectedBlockId
    );
    return block ? block.hostel_block_room : [];
  };

  // Event handlers
  const handleHostelChange = (hostelName) => {
    setSelectedHostelName(hostelName);
    setHostelDetails(null);
    setSelectedBlockId("");
    setSelectedRoomId("");
    setMessage("");
  };

  const handleBlockChange = (blockId) => {
    setSelectedBlockId(blockId);
    setSelectedRoomId("");
  };

  const handleRoomChange = (roomId) => {
    setSelectedRoomId(roomId);
    console.log("Selected Room ID:", roomId);
    console.log("Student ID:", studentId);
  };

  const handleBookNow = async (e) => {
    e.preventDefault();
    setMessage("Processing your booking...");
    setError(null);

    if (isStudentBooked) {
      setMessage("❌ You have already booked an accommodation.");
      return;
    }

    if (!studentId || !token) {
      setMessage("❌ Authentication required. Please log in first.");
      return;
    }
    if (!selectedRoomId) {
      setMessage("❌ Please select a room to book.");
      return;
    }

    setLoading(true);

    try {
      const bookingResponse = await bookAccommodation(
        selectedRoomId,
        studentId,
        token
      );
      setMessage(
        "✅ Accommodation booked successfully! You can now proceed to payment."
      );
      console.log("Booking successful:", bookingResponse);
      setIsStudentBooked(true);
    } catch (err) {
      console.error("Error during booking:", err);
      if (err.response?.status === 409) {
        setError(
          err.response?.data?.error ||
            "You have already booked an accommodation."
        );
        setMessage(
          "❌ " +
            (err.response?.data?.error ||
              "You have already booked an accommodation.")
        );
        setIsStudentBooked(true);
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to book accommodation. Please try again."
        );
        setMessage(
          "❌ " +
            (err.response?.data?.error ||
              "Failed to book accommodation. Please try again.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Early returns for loading and error states
  if (checkingBookingStatus) {
    return <BookingStatusChecker />;
  }

  if (error) {
    return (
      <MessageDisplay message={`Error: ${error}`} type="error" fullScreen />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl my-10 font-sans">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Hostel & Room Booking
      </h2>

      {!hasPaid ? (
        <div className="text-center mt-6">
          <p className="text-red-600 mb-4">
            ❌ You must complete your payment to proceed with hostel booking.
          </p>
          <a href="/payment-status">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go to Payment Page
            </button>
          </a>
        </div>
      ) : (
        <form onSubmit={handleBookNow} className="space-y-6">
          {!isStudentBooked && (
            <>
              <HostelSelector
                selectedHostelName={selectedHostelName}
                onHostelChange={handleHostelChange}
                hostelOptions={initialHostelOptions}
                disabled={loading}
              />

              {hostelDetails && (
                <p className="text-center text-gray-600 mb-6">
                  Gender: {hostelDetails.gender}
                </p>
              )}

              {selectedHostelName &&
                hostelDetails?.hostel_block?.length > 0 && (
                  <BlockSelector
                    selectedBlockId={selectedBlockId}
                    onBlockChange={handleBlockChange}
                    blocks={hostelDetails.hostel_block}
                    disabled={loading}
                  />
                )}

              {selectedBlockId && getRoomsForCurrentBlock().length > 0 && (
                <RoomSelector
                  selectedRoomId={selectedRoomId}
                  onRoomChange={handleRoomChange}
                  rooms={getRoomsForCurrentBlock()}
                  disabled={loading}
                />
              )}

              <BookingButton
                loading={loading}
                isStudentBooked={isStudentBooked}
                disabled={!selectedRoomId || !studentId || loading}
              />
            </>
          )}

          {isStudentBooked && (
            <PaymentButton
              isStudentBooked={isStudentBooked}
              disabled={loading}
            />
          )}
        </form>
      )}
      <MessageDisplay message={message} />
    </div>
  );
};

export default HostelAndRoomBooking;
