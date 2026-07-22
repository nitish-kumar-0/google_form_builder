import "./Header.css";

function Header() {
  return (
    <header className="header">

      <button className="previewBtn">
        Preview
      </button>

      <button
        className="backBtn"
        style={{ display: "none" }}
      >
        Back
      </button>

    </header>
  );
}

export default Header;