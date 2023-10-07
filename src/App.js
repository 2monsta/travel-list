// import logo from './logo.svg';
// import './App.css';

import { useState } from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [selectOption, setSelectOption] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!description) return;

    const newItem =  { description, selectOption, packed: false, id: Date.now()}
    
    initialItems.push(newItem)

    setDescription("");
    setSelectOption(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={selectOption} onChange={(e)=>{
        setSelectOption(e.target.value); 
        console.log(e.target.value)
        }}>
        {Array.from({length: 20},(_, i) => i+1).map(num=><option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <Item item={item} />;
        })}
      </ul>
    </div>
  );
}

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
        <button>❌</button>
      </span>
    </li>
  );
};

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (x%)</em>
    </footer>
  );
}
