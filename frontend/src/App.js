import React from 'react';
import Routes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated && <Header />}
      <main className="main-content">
        <Routes />
      </main>
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;