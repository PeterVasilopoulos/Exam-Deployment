import {Routes, Route, Link} from 'react-router-dom';
import './App.css';

// Route imports
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import RandomNote from './components/RandomNote';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Dashboard Route */}
        <Route path='/' element={<Dashboard/>}/>

        {/* Create Note */}
        <Route path='/notes/new' element={<CreateNote/>}/>

        {/* Edit Note */}
        <Route path='/notes/:id' element={<EditNote/>}/>

        {/* Random Note */}
        <Route path='/notes/rand' element={<RandomNote/>}/>
      </Routes>
    </div>
  );
}

export default App;