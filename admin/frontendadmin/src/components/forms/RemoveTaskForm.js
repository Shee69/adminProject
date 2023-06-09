import React, { useState } from "react";
import axios from "axios";

import { Button, Form, Row, Col, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";

function RemoveTaskForm({ tasks, onFormSubmit }) {
  const filteredTasks = tasks.filter((task) => task.name !== "Unassigned");

  const [selectedTask, setSelectedTask] = useState(null);

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showDeleteFail, setShowDeleteFail] = useState(false);

  const handleChange = (e) => {
    let taskName = e.target.value;
    const task = tasks.find((task) => task.name === taskName);
    setSelectedTask(task);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let success;
    try {
      const response = await axios.delete(
        `${BASE_URL}tasks/${selectedTask.name}`
      );
      success = response.data;
    } catch (error) {
      console.log(error);
    }
    if (success === "") {
      setShowDeleteSuccess(true);
    } else {
      setShowDeleteFail(true);
    }
    setSelectedTask(null);
    event.target.reset();
    onFormSubmit();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationEmployee">
            <Form.Label>Select a task</Form.Label>
            <select className="w-100" multiple onChange={handleChange}>
              <option disabled value="">
                Select an employee
              </option>
              {filteredTasks.map((task) => (
                <option key={task.name} value={task.name}>
                  {task.name}
                </option>
              ))}
            </select>
            {selectedTask && (
              <div className="mt-3">
                <p>Name: {selectedTask.name}</p>
                <p>Description: {selectedTask.description}</p>
                <p>Roles Required: {selectedTask.role_requirement}</p>
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
          Task successfully deleted!
        </Alert>
      )}
    </>
  );
};

export default RemoveTaskForm;
