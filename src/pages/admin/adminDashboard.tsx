// import { useState, useEffect } from "react";
// import { createUseStyles } from "react-jss"; // You can install with: npm i react-jss

// interface Post {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   status: "pending" | "approved" | "rejected";
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   status: "pending" | "approved";
// }

// const useStyles = createUseStyles({
//   adminDashboard: {
//     padding: "2rem",
//     fontFamily: "'Poppins', sans-serif",
//     background: "#fafafa",
//     minHeight: "100vh",
//   },
//   adminTitle: {
//     textAlign: "center",
//     fontSize: "2rem",
//     marginBottom: "1.5rem",
//     color: "#3b3b3b",
//   },
//   tabs: {
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: "2rem",
//     gap: "1rem",
//     flexWrap: "wrap",
//   },
//   tabButton: {
//     background: "#eee",
//     border: "none",
//     padding: "0.8rem 1.5rem",
//     borderRadius: "25px",
//     cursor: "pointer",
//     fontWeight: 500,
//     transition: "all 0.3s ease",
//     "&.active": {
//       background: "#007bff",
//       color: "white",
//       boxShadow: "0 2px 8px rgba(0, 123, 255, 0.4)",
//     },
//   },
//   section: {
//     "& h2": {
//       marginTop: "2rem",
//       color: "#333",
//       fontSize: "1.3rem",
//       borderBottom: "2px solid #ddd",
//       paddingBottom: "0.5rem",
//     },
//   },
//   cardGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: "1.5rem",
//     marginTop: "1rem",
//   },
//   card: {
//     background: "white",
//     padding: "1.2rem",
//     borderRadius: "12px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     transition: "transform 0.2s ease",
//     "&:hover": {
//       transform: "translateY(-3px)",
//     },
//     "& h3": {
//       marginBottom: "0.4rem",
//       color: "#222",
//     },
//     "& p": {
//       color: "#555",
//       fontSize: "0.9rem",
//     },
//   },
//   actions: {
//     display: "flex",
//     gap: "0.8rem",
//     marginTop: "1rem",
//   },
//   approveBtn: {
//     background: "#28a745",
//     color: "white",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   rejectBtn: {
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   approvedCard: {
//     borderLeft: "5px solid #28a745",
//   },
//   rejectedCard: {
//     borderLeft: "5px solid #dc3545",
//   },
// });

// export default function AdminDashboard() {
//   const classes = useStyles();
//   const [activeTab, setActiveTab] = useState("posts");
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     // Mock data - replace with backend API calls
//     setPosts([
//       { id: 1, title: "Sant Wisdom Article", author: "Ramesh", category: "Spiritual", status: "pending" },
//       { id: 2, title: "Devotion Guide", author: "Mahesh", category: "Bhakti", status: "approved" },
//       { id: 3, title: "Meditation Tips", author: "Suresh", category: "Yoga", status: "rejected" },
//     ]);

//     setUsers([
//       { id: 1, name: "Piyush", email: "piyush@gmail.com", status: "pending" },
//       { id: 2, name: "Rahul", email: "rahul@gmail.com", status: "approved" },
//     ]);
//   }, []);

//   const handleApprovePost = (id: number) => {
//     setPosts(posts.map(p => (p.id === id ? { ...p, status: "approved" } : p)));
//   };

//   const handleRejectPost = (id: number) => {
//     setPosts(posts.map(p => (p.id === id ? { ...p, status: "rejected" } : p)));
//   };

//   const handleApproveUser = (id: number) => {
//     setUsers(users.map(u => (u.id === id ? { ...u, status: "approved" } : u)));
//   };

//   const handleRejectUser = (id: number) => {
//     setUsers(users.map(u => (u.id === id ? { ...u, status: "pending" } : u)));
//   };

//   return (
//     <div className={classes.adminDashboard}>
//       <h1 className={classes.adminTitle}>🧘‍♂️ Admin Dashboard</h1>

//       <div className={classes.tabs}>
//         <button
//           className={`${classes.tabButton} ${activeTab === "posts" ? "active" : ""}`}
//           onClick={() => setActiveTab("posts")}
//         >
//           Manage Posts / Articles
//         </button>
//         <button
//           className={`${classes.tabButton} ${activeTab === "users" ? "active" : ""}`}
//           onClick={() => setActiveTab("users")}
//         >
//           Manage Users
//         </button>
//       </div>

//       {/* Posts / Articles Section */}
//       {activeTab === "posts" && (
//         <div className={classes.section}>
//           <h2>Pending Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "pending")
//               .map(p => (
//                 <div className={classes.card} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                   <div className={classes.actions}>
//                     <button className={classes.approveBtn} onClick={() => handleApprovePost(p.id)}>Approve</button>
//                     <button className={classes.rejectBtn} onClick={() => handleRejectPost(p.id)}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <h2>Approved Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "approved")
//               .map(p => (
//                 <div className={`${classes.card} ${classes.approvedCard}`} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                 </div>
//               ))}
//           </div>

//           <h2>Rejected Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "rejected")
//               .map(p => (
//                 <div className={`${classes.card} ${classes.rejectedCard}`} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* Users Section */}
//       {activeTab === "users" && (
//         <div className={classes.section}>
//           <h2>Pending User Registrations</h2>
//           <div className={classes.cardGrid}>
//             {users
//               .filter(u => u.status === "pending")
//               .map(u => (
//                 <div className={classes.card} key={u.id}>
//                   <h3>{u.name}</h3>
//                   <p>📧 {u.email}</p>
//                   <div className={classes.actions}>
//                     <button className={classes.approveBtn} onClick={() => handleApproveUser(u.id)}>Approve</button>
//                     <button className={classes.rejectBtn} onClick={() => handleRejectUser(u.id)}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <h2>Approved Users</h2>
//           <div className={classes.cardGrid}>
//             {users
//               .filter(u => u.status === "approved")
//               .map(u => (
//                 <div className={`${classes.card} ${classes.approvedCard}`} key={u.id}>
//                   <h3>{u.name}</h3>
//                   <p>📧 {u.email}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// --------------------------------------------- PREVIOUS OLD ONE-------------------------------------------------
// import { useState, useEffect } from "react";
// import { createUseStyles } from "react-jss";

// interface Post {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   status: "pending" | "approved" | "rejected";
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   status: "pending" | "approved";
// }

// const useStyles = createUseStyles({
//   adminDashboard: {
//     padding: "2rem",
//     fontFamily: "'Poppins', sans-serif",
//     background: "#fafafa",
//     minHeight: "100vh",
//   },
//   adminTitle: {
//     textAlign: "center",
//     fontSize: "2rem",
//     marginBottom: "1.5rem",
//     color: "#3b3b3b",
//   },
//   tabs: {
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: "2rem",
//     gap: "1rem",
//     flexWrap: "wrap",
//   },
//   tabButton: {
//     background: "#eee",
//     border: "none",
//     padding: "0.8rem 1.5rem",
//     borderRadius: "25px",
//     cursor: "pointer",
//     fontWeight: 500,
//     transition: "all 0.3s ease",
//     "&.active": {
//       background: "#007bff",
//       color: "white",
//       boxShadow: "0 2px 8px rgba(0, 123, 255, 0.4)",
//     },
//   },
//   section: {
//     "& h2": {
//       marginTop: "2rem",
//       color: "#333",
//       fontSize: "1.3rem",
//       borderBottom: "2px solid #ddd",
//       paddingBottom: "0.5rem",
//     },
//   },
//   cardGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: "1.5rem",
//     marginTop: "1rem",
//   },
//   card: {
//     background: "white",
//     padding: "1.2rem",
//     borderRadius: "12px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     transition: "transform 0.2s ease",
//     "&:hover": {
//       transform: "translateY(-3px)",
//     },
//     "& h3": {
//       marginBottom: "0.4rem",
//       color: "#222",
//     },
//     "& p": {
//       color: "#555",
//       fontSize: "0.9rem",
//     },
//   },
//   actions: {
//     display: "flex",
//     gap: "0.8rem",
//     marginTop: "1rem",
//   },
//   approveBtn: {
//     background: "#28a745",
//     color: "white",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   rejectBtn: {
//     background: "#dc3545",
//     color: "white",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },
//   approvedCard: {
//     borderLeft: "5px solid #28a745",
//   },
//   rejectedCard: {
//     borderLeft: "5px solid #dc3545",
//   },
// });

// export default function AdminDashboard() {
//   const classes = useStyles();
//   const [activeTab, setActiveTab] = useState("posts");
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     setPosts([
//       { id: 1, title: "Sant Wisdom Article", author: "Ramesh", category: "Spiritual", status: "pending" },
//       { id: 2, title: "Devotion Guide", author: "Mahesh", category: "Bhakti", status: "approved" },
//       { id: 3, title: "Meditation Tips", author: "Suresh", category: "Yoga", status: "rejected" },
//     ]);

//     setUsers([
//       { id: 1, name: "Piyush", email: "piyush@gmail.com", status: "pending" },
//       { id: 2, name: "Rahul", email: "rahul@gmail.com", status: "approved" },
//     ]);
//   }, []);

//   const handleApprovePost = (id: number) => {
//     setPosts(posts.map(p => (p.id === id ? { ...p, status: "approved" } : p)));
//   };

//   const handleRejectPost = (id: number) => {
//     setPosts(posts.map(p => (p.id === id ? { ...p, status: "rejected" } : p)));
//   };

//   const handleApproveUser = (id: number) => {
//     setUsers(users.map(u => (u.id === id ? { ...u, status: "approved" } : u)));
//   };

//   const handleRejectUser = (id: number) => {
//     setUsers(users.map(u => (u.id === id ? { ...u, status: "pending" } : u)));
//   };

//   return (
//     <div className={classes.adminDashboard}>
//       <h1 className={classes.adminTitle}>🧘‍♂️ Admin Dashboard</h1>

//       <div className={classes.tabs}>
//         <button
//           className={`${classes.tabButton} ${activeTab === "posts" ? "active" : ""}`}
//           onClick={() => setActiveTab("posts")}
//         >
//           Manage Posts / Articles
//         </button>
//         <button
//           className={`${classes.tabButton} ${activeTab === "users" ? "active" : ""}`}
//           onClick={() => setActiveTab("users")}
//         >
//           Manage Users
//         </button>
//       </div>

//       {activeTab === "posts" && (
//         <div className={classes.section}>
//           <h2>Pending Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "pending")
//               .map(p => (
//                 <div className={classes.card} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                   <div className={classes.actions}>
//                     <button className={classes.approveBtn} onClick={() => handleApprovePost(p.id)}>Approve</button>
//                     <button className={classes.rejectBtn} onClick={() => handleRejectPost(p.id)}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <h2>Approved Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "approved")
//               .map(p => (
//                 <div className={`${classes.card} ${classes.approvedCard}`} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                 </div>
//               ))}
//           </div>

//           <h2>Rejected Posts</h2>
//           <div className={classes.cardGrid}>
//             {posts
//               .filter(p => p.status === "rejected")
//               .map(p => (
//                 <div className={`${classes.card} ${classes.rejectedCard}`} key={p.id}>
//                   <h3>{p.title}</h3>
//                   <p>👤 {p.author}</p>
//                   <p>📂 {p.category}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}

//       {activeTab === "users" && (
//         <div className={classes.section}>
//           <h2>Pending User Registrations</h2>
//           <div className={classes.cardGrid}>
//             {users
//               .filter(u => u.status === "pending")
//               .map(u => (
//                 <div className={classes.card} key={u.id}>
//                   <h3>{u.name}</h3>
//                   <p>📧 {u.email}</p>
//                   <div className={classes.actions}>
//                     <button className={classes.approveBtn} onClick={() => handleApproveUser(u.id)}>Approve</button>
//                     <button className={classes.rejectBtn} onClick={() => handleRejectUser(u.id)}>Reject</button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <h2>Approved Users</h2>
//           <div className={classes.cardGrid}>
//             {users
//               .filter(u => u.status === "approved")
//               .map(u => (
//                 <div className={`${classes.card} ${classes.approvedCard}`} key={u.id}>
//                   <h3>{u.name}</h3>
//                   <p>📧 {u.email}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// ----------------------------------------------- NEW ONE -------------------------------------------


import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "pending" | "approved" | "rejected";
}

interface User {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
}

const useStyles = createUseStyles({
  adminDashboard: { padding: "2rem", fontFamily: "'Poppins', sans-serif", background: "#fafafa", minHeight: "100vh" },
  adminTitle: { textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem", color: "#3b3b3b" },
  tabs: { display: "flex", justifyContent: "center", marginBottom: "2rem", gap: "1rem", flexWrap: "wrap" },
  tabButton: {
    background: "#eee",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.3s ease",
    "&.active": { background: "#007bff", color: "white", boxShadow: "0 2px 8px rgba(0, 123, 255, 0.4)" },
  },
  section: { "& h2": { marginTop: "2rem", color: "#333", fontSize: "1.3rem", borderBottom: "2px solid #ddd", paddingBottom: "0.5rem" } },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1rem" },
  card: { background: "white", padding: "1.2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", transition: "transform 0.2s ease",
          "&:hover": { transform: "translateY(-3px)" }, "& h3": { marginBottom: "0.4rem", color: "#222" }, "& p": { color: "#555", fontSize: "0.9rem" } },
  actions: { display: "flex", gap: "0.8rem", marginTop: "1rem" },
  approveBtn: { background: "#28a745", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" },
  rejectBtn: { background: "#dc3545", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer" },
  approvedCard: { borderLeft: "5px solid #28a745" },
  rejectedCard: { borderLeft: "5px solid #dc3545" },
});

export default function AdminDashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "users">("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin"); // Redirect if no token
      return;
    }

    const fetchData = async () => {
      try {
        // Backend URL
        const baseUrl = "http://localhost:5000";

        // Fetch Users
        const usersRes = await fetch(`${baseUrl}/api/admin/pending-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);

        // Fetch Posts
        const postsRes = await fetch(`${baseUrl}/api/admin/pending-posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!postsRes.ok) throw new Error("Failed to fetch posts");
        const postsData = await postsRes.json();
        setPosts(postsData.posts || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        alert("Session expired or server error. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
      }
    };

    fetchData();
  }, [token, navigate]);

  // Approve/Reject functions (similar for users & posts)
  const handleAction = async (url: string, id: string, updateFn: Function, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`http://localhost:5000${url}/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Action failed");
      updateFn((prev: any[]) => prev.map(item => (item.id === id ? { ...item, status } : item)));
    } catch (err) {
      console.error(err);
      alert("Action failed. Please try again.");
    }
  };

  const handleApproveUser = (id: string) => handleAction("/api/admin/approve-user", id, setUsers, "approved");
  const handleRejectUser = (id: string) => handleAction("/api/admin/reject-user", id, setUsers, "rejected");
  const handleApprovePost = (id: string) => handleAction("/api/admin/approve-post", id, setPosts, "approved");
  const handleRejectPost = (id: string) => handleAction("/api/admin/reject-post", id, setPosts, "rejected");

  return (
    <div className={classes.adminDashboard}>
      <h1 className={classes.adminTitle}>🧘‍♂️ Admin Dashboard</h1>

      <div className={classes.tabs}>
        <button className={`${classes.tabButton} ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>Manage Posts / Articles</button>
        <button className={`${classes.tabButton} ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Manage Users</button>
      </div>

      {activeTab === "posts" && (
        <div className={classes.section}>
          <h2>Pending Posts</h2>
          <div className={classes.cardGrid}>
            {posts.filter(p => p.status === "pending").map(p => (
              <div className={classes.card} key={p.id}>
                <h3>{p.title}</h3>
                <p>👤 {p.author}</p>
                <p>📂 {p.category}</p>
                <div className={classes.actions}>
                  <button className={classes.approveBtn} onClick={() => handleApprovePost(p.id)}>Approve</button>
                  <button className={classes.rejectBtn} onClick={() => handleRejectPost(p.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>

          <h2>Approved Posts</h2>
          <div className={classes.cardGrid}>
            {posts.filter(p => p.status === "approved").map(p => (
              <div className={`${classes.card} ${classes.approvedCard}`} key={p.id}>
                <h3>{p.title}</h3>
                <p>👤 {p.author}</p>
                <p>📂 {p.category}</p>
              </div>
            ))}
          </div>

          <h2>Rejected Posts</h2>
          <div className={classes.cardGrid}>
            {posts.filter(p => p.status === "rejected").map(p => (
              <div className={`${classes.card} ${classes.rejectedCard}`} key={p.id}>
                <h3>{p.title}</h3>
                <p>👤 {p.author}</p>
                <p>📂 {p.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className={classes.section}>
          <h2>Pending User Registrations</h2>
          <div className={classes.cardGrid}>
            {users.filter(u => u.status === "pending").map(u => (
              <div className={classes.card} key={u.id}>
                <h3>{u.name}</h3>
                <p>📧 {u.email}</p>
                <div className={classes.actions}>
                  <button className={classes.approveBtn} onClick={() => handleApproveUser(u.id)}>Approve</button>
                  <button className={classes.rejectBtn} onClick={() => handleRejectUser(u.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>

          <h2>Approved Users</h2>
          <div className={classes.cardGrid}>
            {users.filter(u => u.status === "approved").map(u => (
              <div className={`${classes.card} ${classes.approvedCard}`} key={u.id}>
                <h3>{u.name}</h3>
                <p>📧 {u.email}</p>
              </div>
            ))}
          </div>

          <h2>Rejected Users</h2>
          <div className={classes.cardGrid}>
            {users.filter(u => u.status === "rejected").map(u => (
              <div className={`${classes.card} ${classes.rejectedCard}`} key={u.id}>
                <h3>{u.name}</h3>
                <p>📧 {u.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
