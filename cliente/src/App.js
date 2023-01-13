import logo from './logo.svg';
import './App.css';
import { PaymentComponent } from './Components/Payment/PaymentComponent'
import { CardElementComponent } from './Components/CardElementComponent'
import { CustomPaymentComponent } from './Components/CustomPaymentComponent'

function App() {
  return (<>
    {/* <CardElementComponent />  */}
    <CustomPaymentComponent />
    {/* <PaymentComponent />*/}
  </>
  );
}

export default App;
