import React from 'react';
import ReactDOM from 'react-dom/client';
import LotteryGenerator from './LotteryGenerator';
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LotteryGenerator />
  </React.StrictMode>
);