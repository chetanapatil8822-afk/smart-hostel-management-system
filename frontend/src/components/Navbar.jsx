function Navbar() {
  return (
    <div style={{
      height: "60px",
      background: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      
      <h3>Smart Hostel Management</h3>

      <div>
        Admin
      </div>

    </div>
  );
}

export default Navbar;