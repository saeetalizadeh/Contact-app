import styles from "./Header.module.css";
function Header({ show, setShow, search, setSearch }) {
  const searchHandler = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const showHandler = () => {
    setShow((i) => !i);
  };
  return (
    <>
      {!show && (
        <div className={styles.container}>
          <h1>Contact App</h1>

          <input
            type="text"
            placeholder="Search here.."
            onChange={searchHandler}
          />
        </div>
      )}
      <button className={styles.button} onClick={showHandler}>
        {show ? "-" : "+"}
      </button>
    </>
  );
}

export default Header;
