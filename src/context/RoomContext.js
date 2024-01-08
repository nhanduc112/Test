// reducer.js
const initialState = {
    roomData: {
      title: "",
      price: 0,
      maxPeople: 1,
      desc: "",
      roomNumbers: [
        { number: 1, unavailableDates: [] },
        { number: 2, unavailableDates: [] },
        // Thêm các phòng khác nếu cần
      ],
    },
    loading: false,
    error: null,
  };
  
  const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ROOM_DATA":
        return { ...state, roomData: action.payload };
      case "CREATE_ROOM_START":
        return { ...state, loading: true, error: null };
      case "CREATE_ROOM_SUCCESS":
        return { ...state, loading: false, error: null };
      case "CREATE_ROOM_FAILURE":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default roomReducer;
  