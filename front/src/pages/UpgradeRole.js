import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { upgradeRole } from '../http/authAPI';
import { observer } from 'mobx-react-lite';

const UpgradeRole = observer(() => {
  const { id } = useParams(); // Извлечение userID из параметров URL
  console.log(useParams)
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpgradeRole = async () => {
    try {
      setError("");
      const response = await upgradeRole(id, adminPassword);
      setSuccess("Роль успешно повышена до администратора!");
      console.log("Upgrade response:", response);
    } catch (e) {
      setError("Не удалось повысить роль. Проверьте admin_password и повторите попытку.");
      console.error("Failed to upgrade role:", e);
    }
  };

  return (
    <div>
      <div>
      <h2>Повышение роли до администратора</h2>
      <input
        type="password"
        placeholder="Введите admin_password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <button onClick={handleUpgradeRole}>Повысить роль</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </div>
    </div>
  );
});

export default UpgradeRole;
