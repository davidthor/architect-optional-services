import ArchitectHeader from './components/ArchitectHeader';
// import ArchitectItems from "./components/ArchitectItems";
import ArchitectNextSteps from "./components/ArchitectNextSteps";
import './index.css';

const App = () => (
  <div className="container">
    <ArchitectHeader/>
    <ArchitectNextSteps/>
    {/* <ArchitectItems/> */}
  </div>
);

export default App;

/*
  Some lines of code in this file are commented out. Follow along with the
  "Registering Dependencies" section in the README to learn more about enabling
  some of the additional features included in this application.
*/
