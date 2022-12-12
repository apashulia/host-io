import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomForm, CustomLoading, CustomResult } from "./components";

import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

function App() {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e, inputValue, setInputValue) => {
    e.preventDefault();
    const arrOfDomains = inputValue.split("\n");

    const areDomainsHaveValidNames = arrOfDomains.reduce((acc, domaine, i) => {
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

    if (areDomainsHaveValidNames && !isDomainsMoreThenTen) {
      setIsLoading(true);
      const data = await Promise.allSettled(
        arrOfDomains.map(async (domain) => {
          const res = await fetch(`http://localhost:3000/${domain}`);
          return await res.json();
        })
      );
      setInputValue("");
      setDomains(data);
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <CustomForm onSubmit={onSubmit} />
      <CustomResult domains={domains} />
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
      <CustomLoading isLoading={isLoading} />
    </div>
  );
}

export default App;
