import React from 'react';
import  './app.css';

// import Data from './data.xml';
// import Notes from './data.csv';
//
// import toml from './data.toml';
// import yaml from './data.yaml';
// import json from './data.json5';

import printMe from './print.js';
import styled from 'styled-components';
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


function App() {
    console.log("test: terser-webpack-plugin ");

    // console.log(Data);
    // console.log(Notes);
    //
    // console.log(toml.title); // 输出 `TOML Example`
    // console.log(toml.owner.name); // 输出 `Tom Preston-Werner`
    //
    // console.log(yaml.title); // 输出 `YAML Example`
    // console.log(yaml.owner.name); // 输出 `Tom Preston-Werner`
    //
    // console.log(json.title); // 输出 `JSON5 Example`
    // console.log(json.owner.name); // 输出 `Tom Preston-Werner`

    printMe();


    return (
        <div className="App">
            Hello World clean webpack plugin

            <Title>Hello World, this is my first styled component!</Title>
        </div>
    );
}

export default App;
