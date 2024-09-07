import { useState } from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";
function ContactsList({
  contacts,
  deleteHandler,
  show,
  contactsFilter,
  editHandler,
}) {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleSelect = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = () => {
    selectedContacts.forEach((id) => deleteHandler(id));
    setSelectedContacts([]);
    setShowCheckboxes(false);
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes((prev) => !prev);
  };
  return (
    <>
      {!show && (
        <div className={styles.container}>
          <h3>Contacts List</h3>
          <button onClick={toggleCheckboxes}>
            {showCheckboxes ? "Hide Checkboxes" : "Delete Contact"}
          </button>
          {showCheckboxes && (
            <button
              onClick={handleBulkDelete}
              disabled={!selectedContacts.length}
            >
              Delete Selected
            </button>
          )}
          {contacts.length ? (
            <ul className={styles.contacts}>
              {contactsFilter?.map((contact) => (
                <ContactItem
                  editHandler={editHandler}
                  key={contact.id}
                  data={contact}
                  deleteHandler={deleteHandler}
                  selectedContacts={selectedContacts}
                  onSelect={handleSelect}
                  showCheckboxes={showCheckboxes}
                />
              ))}
            </ul>
          ) : (
            <p className={styles.message}>No Contacts Yet!</p>
          )}
        </div>
      )}
    </>
  );
}

export default ContactsList;
