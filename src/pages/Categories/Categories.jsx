import { useEffect, useState } from "react";
import { getLocalStorage } from "../../Services/LocalStorage";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";

export default function Categories() {
  const userToken = getLocalStorage("userToken");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToDeleteName, setCategoryToDeleteName] = useState("");

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3011/admin/listCategories",
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setData(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCategory() {
    try {
      await axios.delete(
        `http://localhost:3011/admin/deleteCategory/${categoryToDelete}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      getCategories();
      setCategoryToDelete(null);
      setCategoryToDeleteName("");
      close();
    } catch (err) {
      console.log(err);
    }
  }

  async function addCategory() {
    try {
      await axios.post(
        "http://localhost:3011/admin/addCategory",
        {
          category: category,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setCategory("");
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div className="container">
        <div>
          <form
            className="py-2 d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addCategory();
            }}
          >
            <input
              className="form-control text-light bg-secondary border-0 focus-ring focus-ring-light"
              type="text"
              placeholder="Category Name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <button className="btn btn-light" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="row">
          {data.map((category) => (
            <div
              className="py-2 d-flex justify-content-between align-items-center border-bottom border-secondary"
              key={category._id}
            >
              <p>{category.name}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setCategoryToDelete(category._id);
                  setCategoryToDeleteName(category.name);
                  open();
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`modal fade ${opened ? "show" : ""}`}
        id="confirmDeleteModal"
        tabIndex="-1"
        aria-labelledby="confirmDeleteModalLable"
        aria-hidden={!opened}
        style={{ display: opened ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-dark"
                id="confirmDeleteModalLabel"
              >
                Confirm Deletion
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={close}
              ></button>
            </div>
            <div className="modal-body text-dark">
              Are you sure you want to delete the <b>{categoryToDeleteName}</b>{" "}
              category?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteCategory}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
