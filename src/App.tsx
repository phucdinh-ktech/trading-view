import { Toaster } from "react-hot-toast";

import AppRouter from "./router/AppRouter";

import "./App.css";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
