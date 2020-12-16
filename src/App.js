import './App.css';
import Projects from './Components/Projects'

function App() {
  
  return (
    <div className="app columns is-vcentered is-centered">
        <div className="column">
          <div className="welcome-content mt-5">
            <h1>Hello World</h1>
            <h2>Welcome to my site.  Please see below some example react widgets. </h2>
          </div>
          <Projects/>
      </div>
    </div>
  );
}

export default App;
