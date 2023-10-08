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
  const [items, setItems] = useState([])

  const handleAddItems = (item) =>{
    setItems((items)=>[...items, item])
  }

  const handleDeleteItems = (id) =>{
    setItems(items=>items.filter(item=>item.id !== id))
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems}/>
      <Stats />
    </div>
  );
}


function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [selectOption, setSelectOption] = useState(1);



  const handleSubmit = (e) => {
    e.preventDefault();

    if(!description) return;

    const newItem =  { description, selectOption, packed: false, id: Date.now()}
    
    onAddItems(newItem);

    setDescription("");
    setSelectOption(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={selectOption} onChange={(e)=>{
        setSelectOption(e.target.value); 
        }}>
        {Array.from({length: 20},(_, i) => i+1).map(num=><option value={num} key={num}>{num}</option>)}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeleteItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return <Item item={item } onDeleteItem={onDeleteItem}/>;
        })}
      </ul>
    </div>
  );
}

const Item = ({ item, onDeleteItem }) => {
  return (
    <li>
      <input type="checkbox"/>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.selectOption} {item.description}
        <button onClick={()=>onDeleteItem(item.id)} >❌</button>
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
