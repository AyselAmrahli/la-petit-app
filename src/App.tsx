import './App.scss';
import Layout from './components/layout';
import { appRoutes } from './routes';


function App() {
  return (
    <div className="App">
      <Layout>
        {appRoutes}
      </Layout>
    </div>
  );
}

export default App;
