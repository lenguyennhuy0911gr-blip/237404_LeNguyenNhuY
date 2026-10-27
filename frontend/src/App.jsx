
import { useEffect, useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Không tải được dữ liệu");
        return res.json();
      })
      .then(setEmployees)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>HỆ THỐNG QUẢN LÝ NHÂN SỰ</h1>
      <h2>Danh sách nhân viên</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Phòng ban</th>
            <th>Chức vụ</th>
            <th>Email</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((nv) => (
            <tr key={nv._id}>
              <td>{nv.employeeId}</td>
              <td>{nv.fullName}</td>
              <td>{nv.gender}</td>
              <td>{nv.department}</td>
              <td>{nv.position}</td>
              <td>{nv.email}</td>
              <td>{nv.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
