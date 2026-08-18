import { SwapForm } from './modules/SwapForm';
import { ToastProvider } from './shares/modules/Toast';

function App() {
  return (
    <ToastProvider>
      <SwapForm />
    </ToastProvider>
  );
}

export default App;
