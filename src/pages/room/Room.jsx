import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./room.css";

const RoomInfo = () => {
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState({
    title: "",
    price: 0,
    maxPeople: 0,
    desc: "",
    roomNumbers: [{ number: 1, unavailableDates: [] }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRoomInfo((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      // Gửi yêu cầu tạo phòng đến API
      await axios.post("/rooms/hotelid", roomInfo);

      // Nếu tạo phòng thành công, chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      console.error("Error creating room:", error);
      setError(error.message || "An error occurred while creating the room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roomInfo">
      <div className="riContainer">
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={roomInfo.title}
          onChange={handleChange}
          className="riInput"
        />
        <input
          type="number"
          id="price"
          placeholder="Price"
          value={roomInfo.price}
          onChange={handleChange}
          className="riInput"
        />
        <input
          type="number"
          id="maxPeople"
          placeholder="Max People"
          value={roomInfo.maxPeople}
          onChange={handleChange}
          className="riInput"
        />
        <input
          type="text"
          id="desc"
          placeholder="Description"
          value={roomInfo.desc}
          onChange={handleChange}
          className="riInput"
        />
        {/* Render input for each room number */}
        {roomInfo.roomNumbers.map((roomNumber, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Room ${roomNumber.number} Unavailable Dates`}
            value={roomNumber.unavailableDates.join(", ")}
            onChange={(e) => {
              const dates = e.target.value.split(", ");
              const updatedRoomNumbers = [...roomInfo.roomNumbers];
              updatedRoomNumbers[index].unavailableDates = dates;
              setRoomInfo((prevData) => ({
                ...prevData,
                roomNumbers: updatedRoomNumbers,
              }));
            }}
            className="riInput"
          />
        ))}
        <button
          disabled={loading}
          onClick={handleCreateRoom}
          className="riButton"
        >
          Create Room
        </button>
        {error && <div className="riError">{error}</div>}
      </div>
    </div>
  );
};

export default RoomInfo;
