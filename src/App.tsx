import "./App.scss";
import Layout from "./components/layout";
import { appRoutes } from "./routes";
import { CardsProvider } from "./shared/context/card";
import { TransactionsProvider } from "./shared/context/transaction";

function App() {
  return (
    <div className="App">
      <Layout>
        <CardsProvider>
          <TransactionsProvider>{appRoutes}</TransactionsProvider>
        </CardsProvider>
      </Layout>
    </div>
  );
}

export default App;
