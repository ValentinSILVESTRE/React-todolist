import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import Footer from './Footer';
import Header from './Header';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Header />
		<App />
		<Footer />
	</React.StrictMode>
);
