import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStore } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import {
  validateName,
  validateEmail,
  validateAddress,
} from '../../utils/validators';
import './Admin.css';

const CreateStore = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!validateName(formData.name)) validationErrors.name = 'Name must be 20-60 characters';
    if (!validateEmail(formData.email)) validationErrors.email = 'Invalid email format';
    if (!validateAddress(formData.address)) validationErrors.address = 'Address must be less than 400 characters';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createStore(token, formData);
      setSuccess(true);
      setTimeout(() => navigate('/admin/stores'), 2000);
    } catch (error) {
      setErrors({ form: error.message || 'Failed to create store' });
    }
  };

  return (
    <div className="admin-form-container">
      <h1>Create New Store</h1>
      {success && (
        <div className="success-message">
          Store created successfully! Redirecting to stores list...
        </div>
      )}
      {errors.form && <div className="error-message">{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Store Name (20-60 characters)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Address (max 400 characters)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <button type="submit" className="submit-button">
          Create Store
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate('/admin/dashboard')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateStore;