import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { BiPlusCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import SearchBar from "../components/SearchBar";

const apiEndpoint = "http://localhost:55149/api/FreelancerData";

const FreelancerList = () => {
  // {Variables}
  const [viewFreelancer, setViewFreelancer] = useState(null);
  const [editFreelancer, setEditFreelancer] = useState(null);
  const [freelancers, setFreelancers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFreelancer, setNewFreelancer] = useState({
    Username: "",
    Email: "",
    PhoneNumber: "",
    Skillsets: "",
    Hobby: "",
  });
  const [filterId, setFilterId] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFreelancerId, setDeleteFreelancerId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // Fetch the list of freelancers from the API
    axios
      .get(apiEndpoint)
      .then((response) => {
        setFreelancers(response.data);
        setFilteredFreelancers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  {
    /* EventHandler*/
  }
  const handleCloseModal = () => {
    setShowModal(false);
    resetFormFields();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editFreelancer) {
      setEditFreelancer({ ...editFreelancer, [name]: value }); // Update editFreelancer state when editing
    } else {
      setNewFreelancer({ ...newFreelancer, [name]: value }); // Update newFreelancer state when creating
    }
  };

  const handleSaveNewFreelancer = () => {
    // Check if any required field is empty
    if (
      !newFreelancer.Username ||
      !newFreelancer.Email ||
      !newFreelancer.PhoneNumber ||
      !newFreelancer.Skillsets ||
      !newFreelancer.Hobby
    ) {
      setShowAlert(true); // Show the red alert
      return; // Stop further processing
    }

    // Send the newFreelancer data to the API
    axios
      .post(apiEndpoint, newFreelancer)
      .then((response) => {
        // Refresh the list of freelancers after successful creation
        axios
          .get(apiEndpoint)
          .then((response) => {
            setFreelancers(response.data);
            setFilteredFreelancers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        // Close the modal after successful creation
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error creating freelancer:", error);
      });
  };
  const resetFormFields = () => {
    setNewFreelancer({
      Username: "",
      Email: "",
      PhoneNumber: "",
      Skillsets: "",
      Hobby: "",
    });
    setEditFreelancer(null);
  };

  const handleFilterChange = (event) => {
    const { id, value } = event.target;

    if (id === "filterCriteria" && value === "Select All") {
      // Reset both filter criteria and filter value
      setFilterCriteria("");
      setFilterValue("");
    } else if (id === "filterCriteria") {
      setFilterCriteria(value);
    } else if (id === "filterValue") {
      setFilterValue(value);
    }
  };

  const handleGetFilter = () => {
    // Filter the freelancers based on the selected filter criteria and value
    const filteredData = freelancers.filter((freelancer) => {
      if (!filterCriteria || !filterValue) return true; // Return all if filterCriteria or filterValue is empty

      const fieldValue = freelancer[filterCriteria]?.toString().toLowerCase();
      return fieldValue.includes(filterValue.toLowerCase());
    });
    setFilteredFreelancers(filteredData);
  };

  const handleEdit = (freelancer) => {
    setEditFreelancer({ ...freelancer }); // Create a shallow copy of the selected freelancer
    handleShowModal(); // Show the edit modal
  };

  const handleUpdateFreelancer = () => {
    // Show the loading spinner
    setIsUpdating(true);

    // Send the updated freelancer data to the API
    axios
      .put(`${apiEndpoint}/${editFreelancer.Id}`, editFreelancer)
      .then((response) => {
        // Refresh the list of freelancers after successful update
        axios
          .get(apiEndpoint)
          .then((response) => {
            setFreelancers(response.data);
            setFilteredFreelancers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        // Close the modal after successful update
        handleCloseModal();
        setEditFreelancer(null); // Reset editFreelancer state
        // Hide the loading spinner
        setIsUpdating(false);
      })
      .catch((error) => {
        console.error("Error updating freelancer:", error);
        // Hide the loading spinner in case of an error
        setIsUpdating(false);
      });
  };
  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteFreelancerId(id);
  };

  const handleContinueDelete = () => {
    if (deleteFreelancerId) {
      axios
        .delete(`${apiEndpoint}/${deleteFreelancerId}`)
        .then((response) => {
          axios
            .get(apiEndpoint)
            .then((response) => {
              setFreelancers(response.data);
              setFilteredFreelancers(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting freelancer:", error);
        });
    }
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteFreelancerId(null);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the index range for displaying freelancers on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFreelancers = filteredFreelancers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleView = (freelancer) => {
    setViewFreelancer(freelancer); // Set the selected freelancer to viewFreelancer
    handleShowViewModal(); // Show the view modal
  };
  const handleShowViewModal = () => {
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewFreelancer(null); // Reset viewFreelancer state when closing the modal
  };

  return (
    <div>
      <h1>Freelancer List</h1>
      <table className="freelancerlist_table table table-bordered table-striped">
        <thead>
          <tr>
            <td colSpan="9">
              <div>
                <Button
                  className="btn_create btn"
                  variant="primary"
                  onClick={handleShowModal}
                >
                  <BiPlusCircle />
                </Button>
              </div>
              <div>
                <SearchBar
                  filterValue={filterValue}
                  filterCriteria={filterCriteria}
                  handleFilterChange={handleFilterChange}
                  handleGetFilter={handleGetFilter}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Skillsets</th>
            {/* <th>Hobby</th> */}
            <th>Actions</th> {/* New column for Edit button */}
          </tr>
        </thead>
        <tbody>
          {/* Display the current freelancers based on the current page */}
          {currentFreelancers.length === 0 ? (
            <tr>
              <td colSpan="8">No freelancers found.</td>
            </tr>
          ) : (
            currentFreelancers.map((freelancer, index) => (
              <tr key={freelancer.Id}>
                <td>{indexOfFirstItem + index + 1}</td>{" "}
                {/* Use the correct index */}
                <td>{freelancer.Id}</td>
                <td>{freelancer.Username}</td>
                <td>{freelancer.Email}</td>
                <td>{freelancer.PhoneNumber}</td>
                <td>{freelancer.Skillsets}</td>
                {/* <td>{freelancer.Hobby}</td> */}
                <td>
                  <Button
                    variant="primary"
                    className="btn"
                    onClick={() => handleView(freelancer)}
                  >
                    <BsInfoCircle />
                  </Button>
                  <Button
                    variant="primary"
                    className="btn"
                    onClick={() => handleEdit(freelancer)}
                  >
                    <FiEdit />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="btn"
                    onClick={() => handleDelete(freelancer.Id)}
                  >
                    {" "}
                    <AiOutlineDelete />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="9">
              {/* Pagination buttons */}
              <div className="pagination btn_paging">
                {Array.from({
                  length: Math.ceil(filteredFreelancers.length / itemsPerPage),
                }).map((_, index) => (
                  <Button
                    key={index}
                    variant="outline-primary"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                &nbsp; &nbsp;
                <span className="page-label">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredFreelancers.length / itemsPerPage)}
                </span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Create Modal */}
      <Modal show={showModal && !editFreelancer} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Freelancer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={newFreelancer.Username}
                onChange={handleInputChange}
              />
              {showAlert && !newFreelancer.Username && (
                <Alert variant="danger">Username is required!</Alert>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={newFreelancer.Email}
                onChange={handleInputChange}
              />
              {showAlert && !newFreelancer.Email && (
                <Alert variant="danger">Email is required!</Alert>
              )}
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="PhoneNumber"
                value={newFreelancer.PhoneNumber}
                onChange={handleInputChange}
              />
              {showAlert && !newFreelancer.PhoneNumber && (
                <Alert variant="danger">Phone Number is required!</Alert>
              )}
            </Form.Group>
            <Form.Group controlId="skillsets">
              <Form.Label>Skillsets</Form.Label>
              <Form.Control
                type="text"
                name="Skillsets"
                value={newFreelancer.Skillsets}
                onChange={handleInputChange}
              />
              {showAlert && !newFreelancer.Skillsets && (
                <Alert variant="danger">Skillsets is required!</Alert>
              )}
            </Form.Group>
            <Form.Group controlId="hobby">
              <Form.Label>Hobby</Form.Label>
              <Form.Control
                type="text"
                name="Hobby"
                value={newFreelancer.Hobby}
                onChange={handleInputChange}
              />
              {showAlert && !newFreelancer.Hobby && (
                <Alert variant="danger">Hobby is required!</Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewFreelancer}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal
        show={showViewModal && viewFreelancer !== null}
        onHide={handleCloseViewModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Freelancer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewFreelancer ? (
            <Form>
              <Form.Group controlId="view-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={viewFreelancer.Username}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="view-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={viewFreelancer.Email}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="view-phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="PhoneNumber"
                  value={viewFreelancer.PhoneNumber}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="view-skillsets">
                <Form.Label>Skillsets</Form.Label>
                <Form.Control
                  type="text"
                  name="Skillsets"
                  value={viewFreelancer.Skillsets}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="view-hobby">
                <Form.Label>Hobby</Form.Label>
                <Form.Control
                  type="text"
                  name="Hobby"
                  value={viewFreelancer.Hobby}
                  readOnly
                />
              </Form.Group>
            </Form>
          ) : (
            <div>No freelancer selected.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showModal && editFreelancer !== null}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Freelancer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isUpdating ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form>
              <Form.Group controlId="edit-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={editFreelancer?.Username || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="edit-email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={editFreelancer?.Email || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="edit-phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="PhoneNumber"
                  value={editFreelancer?.PhoneNumber || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="edit-skillsets">
                <Form.Label>Skillsets</Form.Label>
                <Form.Control
                  type="text"
                  name="Skillsets"
                  value={editFreelancer?.Skillsets || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="edit-hobby">
                <Form.Label>Hobby</Form.Label>
                <Form.Control
                  type="text"
                  name="Hobby"
                  value={editFreelancer?.Hobby || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModal();
              setEditFreelancer(null);
            }}
          >
            Cancel
          </Button>
          {!isUpdating && (
            <Button variant="primary" onClick={handleUpdateFreelancer}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Alert Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleContinueDelete}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FreelancerList;
