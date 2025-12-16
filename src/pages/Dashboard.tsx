import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { title, category, content, image });
    alert("✅ Article submitted successfully!");
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "25px 30px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
        📝 Write a New Article
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Enter article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Spirituality">Spirituality</option>
        </select>

        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#ff6b00",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#e65c00")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ff6b00")
          }
        >
          Publish Article
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
