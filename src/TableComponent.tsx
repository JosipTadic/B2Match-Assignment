import { useState } from "react";
import { Table, Pagination, Container, Row, Col, Badge } from "react-bootstrap";
import useFetch from "./UseFetchHook";
import { Link } from "react-router-dom";

const TableComponent = () => {
  const [skipPage, setSkipPage] = useState(0);

  const { foods, loading } = useFetch(
    "https://api.fda.gov/food/enforcement.json?limit=10&skip=" + skipPage
  );

  const increaseBy10 = () => {
    if (skipPage < 21000) setSkipPage(skipPage + 10);
  };
  const decreaseBy10 = () => {
    if (skipPage > 0) setSkipPage(skipPage - 10);
  };
  const setToFirst = () => {
    setSkipPage(0);
  };
  const setToLast = () => {
    setSkipPage(21000);
  };

  return (
    <>
      <Container className="text-center">
        <Table striped bordered hover size="sm" className="align-middle">
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
                  <td>
                    <Link
                      to={`item/${food.event_id}`}
                      style={{ display: "block" }}
                    >
                      {food.product_description}
                    </Link>
                  </td>
                  <td>
                    {(() => {
                      switch (food.classification) {
                        case "Class I":
                          return (
                            <Badge pill bg="secondary">
                              {food.classification}
                            </Badge>
                          );
                        case "Class II":
                          return (
                            <Badge pill bg="warning">
                              {food.classification}
                            </Badge>
                          );
                        case "Class III":
                          return (
                            <Badge pill bg="danger">
                              {food.classification}
                            </Badge>
                          );
                        default:
                          return <div></div>;
                      }
                    })()}
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan={4}>
                <Container fluid>
                  <Row>
                    <Pagination
                      style={{
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <Col>
                        <Pagination.First onClick={() => setToFirst()}>
                          <b>First page</b>
                        </Pagination.First>
                      </Col>
                      <Col>
                        <Pagination.Prev onClick={() => decreaseBy10()}>
                          <b>Previous page</b>
                        </Pagination.Prev>
                      </Col>
                      <Col>
                        <Pagination.Next onClick={() => increaseBy10()}>
                          <b>Next page</b>
                        </Pagination.Next>
                      </Col>
                      <Col>
                        <Pagination.Last onClick={() => setToLast()}>
                          <b>Last page</b>
                        </Pagination.Last>
                      </Col>
                    </Pagination>
                  </Row>
                </Container>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className="text-center">
        <h3>
          You are currently looking at reports {skipPage} - {skipPage + 10} of:
          21000
        </h3>
        <h4>
          All the data you see is fetched from:{" "}
          <a href={"https://open.fda.gov/"}>Open FDA</a>
        </h4>
      </Container>
    </>
  );
};
/*
{!loading && (
        <h2>
          You are currently looking at reports {skipPage} - {skipPage + 10} of:
          {foods!.meta.results.total}
        </h2>
      )}
*/
export default TableComponent;
