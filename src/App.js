import React, { useState, useEffect } from 'react';
import ModalForm from './ModalForm';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch inventory data and statistics when the component mounts
    fetch('http://localhost:5000/api/get_inventory')
      .then((response) => response.json())
      .then((data) => {
        setInventory(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to open the modal form
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal form
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the form submission (POST request)
  const handleFormSubmit = (formData) => {
    fetch('http://localhost:5000/api/add_item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        closeModal(); // Close the modal after successful submission
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
        <button onClick={openModal}>Add Item</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal form component (conditional rendering based on isModalOpen state) */}
      {isModalOpen && (
        <ModalForm onClose={closeModal} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;
