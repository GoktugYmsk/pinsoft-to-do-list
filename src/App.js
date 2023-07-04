import './App.css';
import { Helmet } from 'react-helmet';


import Content from './compoents/content';
import Footer from './compoents/footer';


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Pinsoft To-Do-List</title>
      </Helmet>
      <h1>To Do List</h1>
      <Content />
      <Footer />
    </div>
  );
}

export default App;
