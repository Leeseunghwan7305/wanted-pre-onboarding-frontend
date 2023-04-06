import { useNavigate } from "react-router-dom";
import "./index.scss";
const Init = () => {
  const navigator = useNavigate();
  return (
    <div className="init">
      <button onClick={() => navigator("/signup")} className="fun-btn">
        회원가입페이지로
        <br /> 이동하기!
      </button>
    </div>
  );
};

export default Init;
