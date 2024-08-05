import Router from "./routes/index";
import { Toaster } from "./components/ui/toaster";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router />
      <Toaster />
      <ToastContainer />
    </>
  );
}
export default App;
