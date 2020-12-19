import './App.css';
import Projects from './Components/Projects'
import globe from'./images/world-with-rings.svg';
function App() {
  
  return (
    <>
    <div className="app columns is-centered">
        <div className="column">
          <div className="has-text-centered">
            <img className="mb-2" src={globe} alt="globe with rings" width="200"/>
            <h1 className="title mb-2">Hello World</h1>
            <h2 className="subtitle mt-2 mb-2">Welcome to my site.  Below are some example react widgets. </h2>
          </div>
          <Projects/>
      </div>
    </div>
    <footer className="footer">
      <a href="https://www.vecteezy.com/free-vector/globe">Globe Vectors by Vecteezy</a>
    </footer>
    </>
  );
}

export default App;
