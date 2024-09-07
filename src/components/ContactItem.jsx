import styles from "./ContactItem.module.css";
function ContactItem({
  data: { id, name, lastName, email, phone },
  deleteHandler,
  editHandler,
  selectedContacts,
  onSelect,
  showCheckboxes,
}) {
  return (
    <li className={styles.item}>
      {showCheckboxes && (
        <input
          type="checkbox"
          checked={selectedContacts.includes(id)}
          onChange={() => onSelect(id)}
        />
      )}
      <p>
        {name} {lastName}
      </p>
      <p>
        <span>✉️</span>
        {email}
      </p>
      <p>
        <span>📞</span>
        {phone}
      </p>
      <button onClick={() => editHandler(id)}>📝</button>
      <button onClick={() => deleteHandler(id)}>🗑️</button>
    </li>
  );
}

export default ContactItem;
