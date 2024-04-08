import Form from "./components/form/Form";
import "./scss/style.scss"
// React-Toastify 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Form/>
      <ToastContainer
        autoClose={3000}
      />
    </div>
  );
}

export default App;
