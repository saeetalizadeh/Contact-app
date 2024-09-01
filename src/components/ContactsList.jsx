import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";
function ContactsList({
  contacts,
  deleteHandler,
  show,
  contactsFilter,
  editHandler,
}) {
  return (
    <>
      {!show && (
        <div className={styles.container}>
          <h3>Contacts List</h3>
          {contacts.length ? (
            <ul className={styles.contacts}>
              {contactsFilter?.map((contact) => (
                <ContactItem
                  editHandler={editHandler}
                  key={contact.id}
                  data={contact}
                  deleteHandler={deleteHandler}
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
