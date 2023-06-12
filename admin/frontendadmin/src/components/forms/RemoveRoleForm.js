import React, { useState } from "react";
import axios from "axios";

import { Button, Form, Row, Col, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";

const RemoveRoleForm = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteFail, setShowDeleteFail] = useState(false);

  const fetchData = async () => {
    try {
      let response = await fetch(BASE_URL + "roles/");
      let data = await response.json();
      const filteredRoles = data.filter(role => role.name !== "Unassigned");
      setRoles(filteredRoles);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    let roleName = e.target.value;
    const role = roles.find((role) => role.name === roleName);
    setSelectedRole(role);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let success;
    try {
      const response = await axios.delete(`${BASE_URL}roles/${selectedRole.name}`);
      success = response.data
    } catch (error) {
      console.log(error);
    }
    if (success === "") {
      setShowDeleteSuccess(true);
    } else {
      setShowDeleteFail(true);
    }
    setSelectedRole(null);
    event.target.reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationEmployee">
            <Form.Label>Select a role</Form.Label>
            <Form.Select onFocus={fetchData} onChange={handleChange}>
            <option disabled value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
            {selectedRole && (
              <div className="mt-3">
                <p>Name: {selectedRole.name}</p>
                <p>Description: {selectedRole.description}</p>
              </div>
            )}
          </Form.Group>
        </Row>
        <Button className="mb-2" type="submit">
          Remove
        </Button>
      </Form>
      {showDeleteFail && (
        <Alert
          variant="danger"
          onClose={() => setShowDeleteFail(false)}
          dismissible
        >
          Uh oh, something went horribly wrong!
        </Alert>
      )}
      {showDeleteSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowDeleteSuccess(false)}
          dismissible
        >
          Role successfully deleted!
        </Alert>
      )}
    </>
  );
};

export default RemoveRoleForm;
