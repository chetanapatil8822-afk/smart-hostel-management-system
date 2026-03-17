function Navbar() {
  return (
    <div style={{
      height: "70px",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}>
      
      <h1 style={{
        fontSize: "26px",
        fontWeight: "700",
        color: "#1e3a8a",   // 👈 Navy Blue
        letterSpacing: "0.5px"
      }}>
        Smart Hostel Management
      </h1>

      <div style={{
        fontSize: "16px",
        fontWeight: "500",
        color: "#030712"
      }}>
        Admin
      </div>

    </div>
  );
}

export default Navbar;