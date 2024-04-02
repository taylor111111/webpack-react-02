import React from 'react';
import  './app.css';

import Data from './data.xml';
import Notes from './data.csv';

function App() {
    console.log("test: terser-webpack-plugin ");

    console.log(Data);
    console.log(Notes);

    return (
        <div className="App">Hello World clean webpack plugin</div>
    );
}

export default App;