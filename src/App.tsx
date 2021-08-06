import { useState } from "react";
import useFetch from "./UseFetchHook";
import "./App.css";
import { Pagination, Table } from "react-bootstrap";

const App = () => {
  const [skipPage, setSkipPage] = useState(0);

  const increaseBy10 = () => {
    if (skipPage < 1990) setSkipPage(skipPage + 10);
  };
  const decreaseBy10 = () => {
    if (skipPage > 0) setSkipPage(skipPage - 10);
  };
  const setToFirst = () => {
    setSkipPage(0);
  };
  const setToLast = () => {
    setSkipPage(1990);
  };

  const { foods, loading } = useFetch(
    "https://api.fda.gov/food/enforcement.json?limit=10&skip=" + skipPage
  );

  return (
    <>
      <h1>Welcome to the table of food recall reports!</h1>
      <h2>
        All the data you see is fetched from{" "}
        <a href={"https://open.fda.gov/"}>Open FDA</a>
      </h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <td>
              <b>Country</b>
            </td>
            <td>
              <b>City</b>
            </td>
            <td>
              <b>Product description</b>
            </td>
            <td>
              <b>Classification</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Fetching your data, please wait...</td>
            </tr>
          ) : (
            foods!.results.map((food) => (
              <tr key={food.event_id}>
                <td>{food.country}</td>
                <td>{food.city}</td>
                <td>{food.product_description}</td>
                <td>{food.classification}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setToFirst()}>
          First Page
        </Pagination.First>
        <Pagination.Prev onClick={() => decreaseBy10()}>
          Previous Page
        </Pagination.Prev>
        <Pagination.Next onClick={() => increaseBy10()}>
          Next Page
        </Pagination.Next>
        <Pagination.Last onClick={() => setToLast()}>Last Page</Pagination.Last>
      </Pagination>
      <h2>
        You are currently looking at {skipPage} - {skipPage + 10} of 2000
      </h2>
    </>
  );
};
/*<h2>There is a total of: {foods!.meta.results.total} </h2>*/
export default App;
