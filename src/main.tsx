import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistStore } from 'redux-persist';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from './store';
import './styles.css';

const store = makeStore(composeWithDevTools());
const persistor = persistStore(store);
const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </StoreProvider>
  </React.StrictMode>,
);
