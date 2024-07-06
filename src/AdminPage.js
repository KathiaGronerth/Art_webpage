import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const subcategories = ["Faces", "Outdoors", "Vehicles"]; // Define subcategories

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    technique: "",
    description: "",
    subcategory: "",
    imageUrl: "",
  });
  const [editForm, setEditForm] = useState({
    title: "",
    technique: "",
    description: "",
    subcategory: "",
    imageUrl: "",
  });
  const [addImageFile, setAddImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [addPreview, setAddPreview] = useState("");
  const [editPreview, setEditPreview] = useState("");
  // const [users, setUsers] = useState([]);
  const [envData, setEnvData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get("/api/users");
    //     setUsers(response.data);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };

    fetchProducts();
    // fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.subcategory === selectedSubcategory)
    );
  }, [selectedSubcategory, products]);

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    setAddImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = addForm.imageUrl;
      if (addImageFile) {
        const formData = new FormData();
        formData.append("subcategory", addForm.subcategory); // Append subcategory first
        formData.append("file", addImageFile);
        console.log("FormData for Add:", [...formData.entries()]); // Log FormData content

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadResponse.data.url;
      }

      const response = await axios.post("/api/products", {
        ...addForm,
        imageUrl,
      });
      setProducts([...products, response.data]);
      setAddForm({
        title: "",
        technique: "",
        description: "",
        subcategory: "",
        imageUrl: "",
      });
      setAddImageFile(null);
      setAddPreview("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = editForm.imageUrl;
      if (editImageFile) {
        const formData = new FormData();
        formData.append("subcategory", editForm.subcategory); // Append subcategory first
        formData.append("file", editImageFile);
        console.log("FormData for Edit:", [...formData.entries()]); // Log FormData content

        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadResponse.data.url;
      }

      const response = await axios.put(`/api/products/${selectedProduct.id}`, {
        ...editForm,
        imageUrl,
      });
      setProducts(
        products.map((p) => (p.id === selectedProduct.id ? response.data : p))
      );
      setSelectedProduct(null);
      setEditImageFile(null);
      setEditPreview("");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setEditForm(product);
    setEditPreview(product.imageUrl);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setSelectedProduct(null);
  };

  const handleEnvChange = (e) => {
    setEnvData({ ...envData, [e.target.name]: e.target.value });
  };

  const handleEnvSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    console.log("Token:", token);

    try {
      await axios.post("/api/mails", envData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      setEnvData({ email: "", password: "" });
    } catch (error) {
      console.error("Error updating environment variables:", error);
      alert("Failed to update environment variables");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      setSelectedProduct(null);
      setEditForm({
        title: "",
        technique: "",
        description: "",
        subcategory: "",
        imageUrl: "",
      });
      setEditPreview("");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>

      <button className="homepage-button" onClick={() => navigate("/")}>
        Go to Homepage
      </button>

      <h2>Add a Painting</h2>
      <form onSubmit={handleAddSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          value={addForm.title}
          onChange={handleAddChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="technique"
          value={addForm.technique}
          onChange={handleAddChange}
          placeholder="Technique"
          required
        />
        <textarea
          name="description"
          value={addForm.description}
          onChange={handleAddChange}
          placeholder="Description"
          required
        ></textarea>
        <select
          name="subcategory"
          value={addForm.subcategory}
          onChange={handleAddChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          onChange={handleAddImageChange}
          accept="image/*"
        />
        {addPreview && (
          <img src={addPreview} alt="Preview" className="image-preview" />
        )}
        <button type="submit">Add Painting</button>
      </form>

      <h2>Edit Existing Paintings</h2>
      <select
        name="subcategory"
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
      >
        <option value="" disabled>
          Select Subcategory
        </option>
        {subcategories.map((subcategory) => (
          <option key={subcategory} value={subcategory}>
            {subcategory}
          </option>
        ))}
      </select>
      {!selectedProduct && (
        <div className="image-grid">
          {filteredProducts.map((product) => (
            <img
              key={product.id}
              src={product.imageUrl}
              alt={product.title}
              className="image-thumbnail"
              onClick={() => handleSelectProduct(product)}
            />
          ))}
        </div>
      )}
      {selectedProduct && (
        <form onSubmit={handleEditSubmit} className="admin-edit-form">
          <h3>Edit Painting</h3>
          <input
            type="text"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="technique"
            value={editForm.technique}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
          ></textarea>
          <select
            name="subcategory"
            value={editForm.subcategory}
            onChange={handleEditChange}
          >
            <option value="" disabled>
              Select Subcategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            onChange={handleEditImageChange}
            accept="image/*"
          />
          {editPreview && (
            <img src={editPreview} alt="Preview" className="image-preview" />
          )}
          <button type="submit">Save Changes</button>
          <button
            type="button"
            onClick={() => handleDeleteProduct(selectedProduct.id)}
          >
            Delete Painting
          </button>
        </form>
      )}

      <h2>Update Contact Email</h2>
      <form onSubmit={handleEnvSubmit} className="env-form">
        <input
          type="email"
          name="email"
          value={envData.email}
          onChange={handleEnvChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={envData.password}
          onChange={handleEnvChange}
          placeholder="Password"
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminPage;
