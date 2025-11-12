import { BrowserRouter, Route, Routes } from "react-router"
import DefaultLayout from "./layouts/DefaultLayout"
import RegistroCliente from "./pages/RegistroCliente"
import NotFound from "./pages/NotFound"
import Billetera from "./pages/Billetera"
import Pagos from "./pages/Pagos"
import { Bounce, ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<RegistroCliente />} />
            <Route path="billetera" element={<Billetera />} />
            <Route path="pagos" element={<Pagos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
