import { useState } from "react";
import { useEffect } from "react";
import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";

function Cotacts({ show, setShow, search }) {
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
        (item) => item.name.includes(search) || item.email.includes(search)
      );
      setContactsFilter(result);
    } else {
      setContactsFilter(contacts);
    }
  }, [search]);
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const addHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please enter valid data!");
      return;
    }

    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setShow(false);
    setMessage("Contact is Added to your list");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };
  const editHandler = (id) => {
    const result = contactsFilter.filter((name) => name.id === id);
    setShow([true, result]);
  };
  console.log(show);

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
          <button onClick={addHandler}>Add Contact</button>
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

export default Cotacts;
