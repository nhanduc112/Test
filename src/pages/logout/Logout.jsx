import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./logout.css";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
 // const [credentials, setCredentials] = useState({  
 // });

  const handleChange = (e) => {
  };

  const handleLogout = async () => {
    try {
      
      dispatch({ type: "LOGOUT_SUCCESS" });
      navigate("/");
    } catch (err) {
      console.error("Đã xảy ra lỗi khi đăng xuất", err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Not Needed"
        id="notNeeded"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      <button onClick={handleLogout} className="lButton">
        Logout
      </button>
    </div>
  );
};

export default Logout;