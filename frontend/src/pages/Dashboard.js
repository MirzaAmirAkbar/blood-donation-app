import { useState, useEffect } from "react";

function Dashboard() {
  const email = localStorage.getItem("email"); // Get logged-in user's email
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    contact_info: "",
    password: "",
    is_available: false,
  });

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) return;

      try {
        const response = await fetch(`http://localhost:5000/api/users/${email}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
          setFormData({
            location: data.location,
            contact_info: data.contact_info,
            password: "",
            is_available: data.is_available,
          });
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [email]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Update user info
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        setUser({ ...user, ...formData });
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div class="a">
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Blood Type:</strong> {user.blood_type}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>

          <label>
            Contact Info:
            <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} />
          </label>

          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>

          <label>
            Available for Blood Donation:
            <input type="checkbox" name="is_available" checked={formData.is_available} onChange={handleChange} />
          </label>

          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Dashboard;
