import { useState, useEffect } from "react";
import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";

function Contacts({ show, setShow, search }) {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("Contacts")) || []
  );
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [contactsFilter, setContactsFilter] = useState([]);

  useEffect(() => {
    setContactsFilter(contacts);
    localStorage.setItem("Contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    if (search.length) {
      const result = contacts.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
      setContactsFilter(result);
    } else {
      setContactsFilter(contacts);
    }
  }, [search, contacts]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    // console.log("error");

    const namePattern = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !contact.name ||
      !namePattern.test(contact.name) ||
      !contact.lastName ||
      !namePattern.test(contact.lastName) ||
      !contact.email ||
      !emailPattern.test(contact.email) ||
      !contact.phone
    ) {
      setAlert("Please enter valid data!");
      return;
    }

    setAlert("");

    if (contact.id) {
      setContacts((contacts) =>
        contacts.map((c) => (c.id === contact.id ? contact : c))
      );
      setMessage("Contact is Updated!");
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
      setMessage("Contact is Added to your list");
    }

    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setShow(false);

    setTimeout(() => {
      setMessage("");
    }, 1500);
  };

  const deleteHandler = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  };

  const editHandler = (id) => {
    const result = contactsFilter.find((contact) => contact.id === id);
    setContact(result);
    setShow(true);
  };

  return (
    <div
      style={{ marginTop: show ? "200px" : "0px" }}
      className={styles.container}
    >
      {show && (
        <div className={styles.form}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={contact[input.name]}
              onChange={changeHandler}
            />
          ))}
          <button onClick={addHandler}>
            {contact.id ? "Update Contact" : "Add Contact"}
          </button>
        </div>
      )}
      {message && <h1>{message}</h1>}
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactsList
        editHandler={editHandler}
        contactsFilter={contactsFilter}
        contacts={contacts}
        deleteHandler={deleteHandler}
        show={show}
      />
    </div>
  );
}

export default Contacts;
