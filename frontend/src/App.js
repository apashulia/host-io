import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import { CustomForm, CustomResult } from "./components";

function App() {
  const [domains, setDomains] = useState([]);

  const onSubmit = async (e, inputValue, setInputValue) => {
    e.preventDefault();
    const arrOfDomains = inputValue.split("\n");

    const isValidDomain = arrOfDomains.reduce((acc, domaine, i) => {
      if (
        !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
          domaine
        )
      ) {
        toast.warning(`Line ${i + 1} has incorrect domaine name`);
        return false;
      }

      return acc;
    }, true);

    const isDomainsMoreThenTen =
      arrOfDomains.length > 10
        ? toast.warning(`Only 10 domains are allowed per request`)
        : "";

    if (isValidDomain && !isDomainsMoreThenTen) {
      setInputValue("");
      setDomains(arrOfDomains);
    }
  };

  return (
    <div className="app">
      <CustomForm onSubmit={onSubmit} />
      <CustomResult domains={domains}/>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
