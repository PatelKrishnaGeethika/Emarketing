import React, { useState, useEffect } from "react";
import OTPVeify from "./otpVerify";
import useAxiosInstance from "../../utils/useAxios";
import "../../styles/editcontact.css";

/**
 * A component to change the contact of a user
 * This component will also handle the verification of the users new contact
 * @param {*} param0
 * @returns
 */
export default function EditContact({ changeContact }) {
  const [change, setChange] = useState(false);
  const [contact, setContact] = useState(null);
  const api = useAxiosInstance();
  const url = "users/contact/";
  useEffect(() => {
    async function editContact() {
      try {
        const data = {
          contact: contact,
        };
        const response = await api.post(url, data);
      } catch (error) {
        console.error(error);
      }
      changeContact(contact);
      setChange(false);
    }
    if (contact !== null) editContact();
  }, [contact]);

  const getContact = (val) => {
    setContact(val);
  };

  const handleEdit = () => {
    setChange(true);
  };
  if (!change) {
    return (
      <div>
        <button onClick={handleEdit} className="edit-btn">
          Edit Info <i className="fa fa-edit"></i>
        </button>
      </div>
    );
  } else {
    return (
      <div className="edit-form">
        <OTPVeify getContact={getContact} />
        <button
          onClick={() => {
            setChange(false);
          }}
          className="cancel-btn"
        >
          cancel<i className="fa fa-times"></i>
        </button>
      </div>
    );
  }
}
