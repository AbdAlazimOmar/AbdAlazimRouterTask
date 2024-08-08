import logo from './logo.svg';
import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider, Link, useParams, useLocation } from 'react-router-dom';

const fruitList = [
  { title: "Potato", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];


function FruitList() {
  const location = useLocation();
  const previousLocation = location.state?.from;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fruit List</h1>
        
        <ul>
          {fruitList.map(fruit => (
            <li key={fruit.id}>
              {fruit.title + "\t"}
              <Link
                to={`/fruit/${fruit.id}`}
                style={{ color: 'yellowgreen', fontSize: '12px' }}
                state={{ from: '/' }} 
              >
                Details
              </Link>
            </li>
          ))}
        </ul>
        {previousLocation && (
          <p style={{color: 'white',fontSize:'12px'}}> Previous location: {previousLocation}</p>
        )}
      </header>
    </div>
  );
}


function FruitDetail() {
  const { id } = useParams();
  const fruit = fruitList.find(p => p.id === parseInt(id));
  

  if (!fruit) {
    return <div>Fruit not found</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fruit Details</h1>
        <p>Id: {id}</p>
        <p>Title: {fruit.title}</p>
        <p>Is Fruit: {fruit.isFruit ? 'Yes' : 'No'}</p>
        <Link 
          to={`/`} 
          style={{ color: 'yellowgreen', fontSize: '12px' }}
          state={{ from: `/fruit/${id}` }} 
        >
          Back To Home
        </Link>
        
      </header>
    </div>
  );
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <FruitList />,
  },
  {
    path: 'fruit/:id',
    element: <FruitDetail />,
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
