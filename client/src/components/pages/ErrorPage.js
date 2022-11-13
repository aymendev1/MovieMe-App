import react from "react";
import Illustartion from "../../assets/7.png";
export default function ErrorPage() {
  const [timer, setTimer] = react.useState(7);

  setTimeout(() => {
    window.location.replace("/");
  }, 7000);
  setTimeout(() => setTimer(timer - 1), 1000);

  return (
    <div className="section errorPage">
      <img src={Illustartion} alt="" />
      <div>
        <span>Error 404</span>
        <span>The page you are trying to reach is not available</span>
        <span>Redirecting to home page in {timer}</span>
      </div>
    </div>
  );
}
