export default function Navbar() {
  return (
    <nav className="navbarRoot">
      <div className="navbarLeft">
        <span
          id="navbar-title"
          className="navbarTitle heroTitleOutline"
          style={{ display: "inline-block" }}
        >
          ØRBIT#0B1T
        </span>
      </div>
      <div className="navbarRight">
        <button className="navbarIconButton">
          <span className="material-symbols-outlined text-white">visibility</span>
        </button>
      </div>
    </nav>
  );
}
