import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useFetch from "./UseFetchHook";

const ItemDetails: React.FC = () => {
  let { event_id } = useParams<{ event_id: string }>();
  //console.log(event_id);
  const { foods, loading } = useFetch(
    "https://api.fda.gov/food/enforcement.json?search=event_id:" + event_id
  );

  return loading ? (
    <tr>
      <td>Fetching your data, please wait...</td>
    </tr>
  ) : (
    <>
      <Container fluid>
        {foods!.results.map((food) => (
          <div key={food.event_id}>
            <h1 className="text-center" style={{ margin: "32px" }}>
              {food.product_description}
            </h1>
            <Row>
              <Col sm={8}>
                <h2>Reason for recall: </h2>
                <h2 style={{ margin: "25px" }}>{food.reason_for_recall}</h2>
                <h3>Distribution pattern:</h3>
                <h3 style={{ margin: "25px" }}>{food.distribution_pattern}</h3>
                <h3 style={{ marginBottom: "20px" }}>
                  Recalling firm: {food.recalling_firm}
                </h3>
                <h3 style={{ marginBottom: "20px" }}>
                  Recall number: {food.recall_number}
                </h3>
                <h3 style={{ marginBottom: "20px" }}>
                  Code info: {food.code_info}
                </h3>
                <h3 style={{ marginBottom: "20px" }}>
                  Initiation: {food.voluntary_mandated}
                </h3>
                {
                  //Some objects are missing this data
                  food.product_quantity && (
                    <h3 style={{ marginBottom: "20px" }}>
                      Product quantity: {food.product_quantity}
                    </h3>
                  )
                }

                <h4>
                  Classification:{" "}
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
                </h4>
              </Col>
              <Col sm={4} className="text-center">
                <h2>Country:</h2>
                {(() => {
                  switch (food.country) {
                    case "United States":
                      return (
                        <div>
                          <img
                            src="https://www.countryflags.io/us/shiny/64.png"
                            alt="US flag"
                          />
                        </div>
                      );
                    case "Canada":
                      return (
                        <div>
                          <img
                            src="https://www.countryflags.io/ca/shiny/64.png"
                            alt="Canada flag"
                          />
                        </div>
                      );
                    case "Mexico":
                      return (
                        <div>
                          <img
                            src="https://www.countryflags.io/mx/shiny/64.png"
                            alt="Mexico flag"
                          />
                        </div>
                      );
                    default:
                      return <div></div>;
                  }
                })()}
                <h2 style={{ marginBottom: "25px" }}>{food.country}</h2>
                <h3>City and address:</h3>
                <h3>
                  {food.city} {food.address_1}
                </h3>
                {food.status === "Terminated" ? (
                  <h3 style={{ margin: "20px" }}>
                    Status: {<Badge bg="success">{food.status}</Badge>}
                  </h3>
                ) : (
                  <h3 style={{ margin: "20px" }}>Status: {food.status}</h3>
                )}
              </Col>
            </Row>
          </div>
        ))}
        <Row className="text-center">
          <Link to={"/"}>
            <Button size="sm" variant="outline-dark">
              Go back!
            </Button>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default ItemDetails;
