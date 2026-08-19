import { SwapForm } from './modules/problem03';
import { ToastProvider } from './shares/modules/Toast';

function App() {
  return (
    <ToastProvider>
      <SwapForm />
    </ToastProvider>
  );
}

export default App;
