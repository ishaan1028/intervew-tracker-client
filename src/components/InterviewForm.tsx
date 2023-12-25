import React, { type FormEvent, type ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InterviewType, Rating, Status } from "../types/interview";

type InterviewFormProps = {
  callback: (requestBody: InterviewType) => void;
  initData?: InterviewType;
};

const InterviewForm: React.FC<InterviewFormProps> = ({
  callback,
  initData,
}) => {
  const [name, setName] = useState<InterviewType["name"]>(initData?.name || "");
  const [status, setStatus] = useState<InterviewType["status"]>(
    initData?.status || "pending"
  );
  const [feedback, seFeedback] = useState<InterviewType["feedback"]>(
    initData?.feedback || undefined
  );
  const [rating, setRating] = useState<InterviewType["rating"]>(
    initData?.rating || undefined
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "feedback":
        seFeedback(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "status":
        if (["pending", "comleted"].includes(status))
          setStatus(value as Status);
        break;
      case "rating":
        if (+value >= 1 && +value <= 5) {
          setRating(+value as Rating);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !status) {
      alert("name is required");
      return;
    }

    if (status === "completed" && (!feedback || !rating)) {
      alert("feedback and rating is required");
      return;
    }

    if (status === "pending" && (feedback || rating)) {
      alert("feedback and rating not allowed in pending status");
      return;
    }

    const requestBody: InterviewType = {
      name,
      status,
      feedback,
      rating,
    };

    callback(requestBody);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          value={name}
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="status">status</Form.Label>
        <Form.Select
          id="status"
          name="status"
          value={status}
          onChange={handleSelectChange}
        >
          <option value={"pending"}>pending</option>
          <option value={"completed"}>completed</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>feedback</Form.Label>
        <Form.Control
          name="feedback"
          placeholder="Enter feedback"
          onChange={handleChange}
          value={feedback || ""}
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="rating">rating</Form.Label>
        <Form.Select
          id="rating"
          name="rating"
          value={rating || 0}
          onChange={handleSelectChange}
        >
          <option value={0} disabled>
            select rating
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>
      </Form.Group>
      <Button className="w-100" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default InterviewForm;
