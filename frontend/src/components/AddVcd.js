import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AdminHeader from "./AdminHeader";
import AdminService from "./AdminService";

function App() {
  const [vcdDetails, setVcdDetails] = useState({
    vcdName: "",
    language: "",
    category: "",
    ratings: "",
    quantity: "",
    cost: "",
    storeId: {
      vcdStoreId: "",
    },
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    AdminService.displayVcdStore().then((response) => {
      setData(response.data);
    });
  }, []);
  const handleChange = (event) => {
    setVcdDetails({ ...vcdDetails, [event.target.name]: event.target.value });
  };
  const handleStoreIdChange = (event) => {
    // Update the vcdStoreId in vcdDetails
    setVcdDetails({
      ...vcdDetails,
      storeId: {
        vcdStoreId: event.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.addVcdDetails(vcdDetails)
      .then((response) => {
        alert(response.data);
        setVcdDetails({
          vcdName: "",
          language: "",
          category: "",
          ratings: "",
          quantity: "",
          cost: "",
          storeId: {
            vcdStoreId: "",
          },
        });
        AdminService.displayVcdStore().then((response) => {
          setData(response.data);
        });
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  return (
    <>
      <AdminHeader />
      <center>
        <div>
          {vcdDetails.storeId.vcdStoreId}
          <h2 style={{ backgroundColor: "green" }}>Add Vcd</h2>
        </div>
      </center>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>Enter VcdName</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Vcd Name"
              name="vcdName"
              value={vcdDetails.vcdName}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label> Enter Language </Form.Label>
            <Form.Control
              type="text"
              placeholder="language"
              name="language"
              value={vcdDetails.language}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label> Select Category </Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              name="category"
              value={vcdDetails.category}
              required
            >
              <option value="">Category</option>
              <option value="SandalWood">SandalWood</option>
              <option value="BollyWood">BollyWood</option>
              <option value="KollyWood">KollyWood</option>
              <option value="Tollywood">Tollywood</option>
              <option value="Mollywood">Mollywood</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label> Enter Vcd Rating </Form.Label>
            <Form.Control
              type="number"
              placeholder="Vcd ratings"
              name="ratings"
              value={vcdDetails.ratings}
              min={1}
              max={5}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label> Enter Vcd Quantity </Form.Label>
            <Form.Control
              type="number"
              placeholder="quantity"
              name="quantity"
              min={1}
              max={100}
              value={vcdDetails.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label> Enter Vcd Cost </Form.Label>
            <Form.Control
              type="number"
              placeholder="Cost"
              name="cost"
              min={100}
              max={1000}
              value={vcdDetails.cost}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Select StoreId</Form.Label>
            <Form.Control
              as="select"
              name="storeId"
              value={vcdDetails.storeId.vcdStoreId}
              onChange={handleStoreIdChange}
              required
            >
              <option value="">select StoreId</option>
              {data.map((item) => (
                <option key={item.vcdStoreId} value={item.vcdStoreId}>
                  {item.vcdStoreId}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col md={1}>
            <Button className="justify-content-center" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default App;
