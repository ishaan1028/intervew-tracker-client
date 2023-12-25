import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "./Home.scss";
import React, { useEffect, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import Paginate from "../../components/Paginate/Paginate";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Button } from "react-bootstrap";
import { InterviewType } from "../../types/interview";
import ModalContainer from "../../components/Modal";
import InterviewForm from "../../components/InterviewForm";

type ResponseProps = {
  totalCount: number;
  data: InterviewType[];
  page: number;
};

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [data, setData] = useState<ResponseProps>();
  const [error, setError] = useState<string>("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [createModalShow, SetCreateModalShow] = useState<boolean>(false);
  const [updateObj, setUpdateObj] = useState<InterviewType | null>(null);

  const refreshResults = () => setRefresh(!refresh);

  const handleSetDeleteId = (id: string) => setDeleteId(id);
  const handleDeleteClose = () => setDeleteId(null);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response: AxiosResponse = await axios.delete(
        `/api/interview/${deleteId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.status === 200 && response.data) {
        alert("interview deleted successfully");
        handleDeleteClose();
        refreshResults();
      } else {
        throw new Error("Invalid response");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      handleDeleteClose();
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleSetUpdateObj = (obj: InterviewType) => setUpdateObj(obj);
  const handleUpdateClose = () => setUpdateObj(null);
  const handleUpdate = (requestBody: InterviewType) => {
    const postRequest = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse = await axios.put(
          `/api/interview/${updateObj!._id}`,
          requestBody,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        if (response.status === 200 && response.data) {
          alert("interview updated successfully");
          handleUpdateClose();
          refreshResults();
        } else {
          throw new Error("Invalid response");
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        handleUpdateClose();
        if (axios.isAxiosError(err)) {
          setError(err?.response?.data?.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      }
    };
    postRequest();
  };

  const handleCreateOpen = () => SetCreateModalShow(true);
  const handleCreateClose = () => SetCreateModalShow(false);

  const handleCreate = (requestBody: InterviewType) => {
    const postRequest = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse = await axios.post(
          `/api/interview`,
          requestBody,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        if (response.status === 200 && response.data) {
          alert("interview created successfully");
          handleCreateClose();
          refreshResults();
        } else {
          throw new Error("Invalid response");
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        handleCreateClose();
        if (axios.isAxiosError(err)) {
          setError(err?.response?.data?.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      }
    };
    postRequest();
  };

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const page = queryParams.get("page") || 1;

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axios.get(
          `/api/interview?page=${page}`,
          {
            headers: { token: localStorage.getItem("token") },
            cancelToken: cancelTokenSource.token,
          }
        );
        setData(response.data);
        setError("");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (axios.isAxiosError(err)) {
          setError(err?.response?.data?.message || "Something went wrong");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setUpdateObj(null);
      }
    };

    fetchData();

    return () => {
      cancelTokenSource.cancel("abort req if unmounted suddenly");
    };
  }, [page, refresh]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <h1 className="d-flex justify-content-center error">
        {error || "Something went wrong"}{" "}
        <span className="ms-3 refresh" onClick={refreshResults}>
          Refresh
        </span>
      </h1>
    );

  return (
    data && (
      <Container>
        <div className="home">
          <h1 className="mb-3">Interview Panel</h1>
          <p className="mb-3">
            Showing {(data.page - 1) * 10 + 1} -{" "}
            {Math.min(data.page * 10, data.totalCount)} of {data.totalCount}{" "}
            Results
          </p>
          <Button onClick={handleCreateOpen}>Create Interview</Button>
          <div className="table-wrapper">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Interview Status</th>
                  <th>Interview Feedback</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((interview) => {
                  return (
                    <tr key={interview._id}>
                      <td>{interview.name || "N/A"}</td>
                      <td>{interview.status || "N/A"}</td>
                      <td>{interview.feedback || "N/A"}</td>
                      <td>{interview.rating || "N/A"}</td>
                      <td>
                        <Button
                          size="sm"
                          className="me-2"
                          onClick={() => handleSetUpdateObj(interview)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleSetDeleteId(interview._id!)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {<Paginate totalCount={data.totalCount} />}
        </div>
        {deleteId && (
          <ModalContainer
            heading={"Delete Post"}
            show={deleteId != null}
            close={handleDeleteClose}
          >
            <div className="p-3">
              <p>Are you sure you want to delete this post?</p>
              <div className="d-flex justify-content-end">
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </ModalContainer>
        )}
        {updateObj && (
          <ModalContainer
            show={updateObj != null}
            heading="Update Interview"
            close={handleUpdateClose}
          >
            <InterviewForm callback={handleUpdate} initData={updateObj} />
          </ModalContainer>
        )}
        {createModalShow && (
          <ModalContainer
            show={createModalShow}
            close={handleCreateClose}
            heading="Create Interview"
          >
            <InterviewForm callback={handleCreate} />
          </ModalContainer>
        )}
      </Container>
    )
  );
};

export default Home;
