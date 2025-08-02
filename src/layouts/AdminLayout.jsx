import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{ width: "240px", background: "var(--grey)", padding: "1rem" }}
      >
        <h2 style={{ color: "var(--primary)" }}>Admin Panel</h2>
        {/* Add nav here */}
      </aside>
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
