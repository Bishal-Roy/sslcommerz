import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [session, setSession] = useState(false);
  const [failed, setFailed] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [state, setState] = useState("");
  // console.log(state);
  const submitHandler = (e) => {
    e.preventDefault();
    if (state.status === "SUCCESS") {
      setSession(true);
      setRedirectUrl(state.GatewayPageURL);
      setFailed(false);
    }else if (state.status === "FAILED") {
      setSession(false);
      setFailed(true);
    }

  };

  useEffect(() => {
    fetch("http://localhost:4000/payment")
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "300px" }}>
      <button onClick={submitHandler}>processed to pay</button>
      {session ? (window.location = redirectUrl) : ""}
      {failed ? <p>failed to start payment session</p> : ""}
    </div>
  );
}

export default App;
