// src/App.js
import React from 'react';
import RegisterPackage from './RegisterPackage';
import PackageStatus from './PackageStatus';

function App() {
  return (
    <div className="App">
      <h1>Seguimiento de Paquetes</h1>
      <RegisterPackage />
      <PackageStatus />
    </div>
  );
}

export default App;