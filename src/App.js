import './App.css';
import Projects from './Components/Projects'

function App() {
  
  return (
    <div className="App">
      <div className="container">
        <div className="welcome-content mt-5">
          <h1>Hello World</h1>
          <h2>Welcome to by portfolio site.  Please see below some client side examples of React. </h2>
        </div>
        <Projects/>
      </div>
    </div>
  );
}

export default App;
