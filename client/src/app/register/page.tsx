"use client";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { register } from "../api/apiCalls";

interface ErrorResponse {
  message: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(formData);
      alert("Yey, registered");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError && axiosError.response) {
        const errorMessage = (axiosError.response.data as ErrorResponse)
          .message;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("An error occurred.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input type="submit" value="Register" />
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegisterPage;
