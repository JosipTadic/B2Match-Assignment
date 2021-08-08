import "./App.css";
import TableComponent from "./TableComponent";
import ItemDetails from "./ItemDetails";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Container className="text-center">
            <h1 style={{ margin: "15px" }}>
              Welcome to the table of food recall reports!
            </h1>
            <h2 style={{ margin: "15px" }}>
              Click on product description to find out more details
            </h2>
          </Container>
          <TableComponent />
        </Route>
        <Route path={`/item/:event_id`}>
          <ItemDetails />
        </Route>
      </Switch>
    </>
  );
};

export default App;
