import { useState, useEffect } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("https://react-first-79uv.onrender.com/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="menu-section">
        <h1>Our Menu</h1>
        <p>
          Explore our diverse range of dishes, from traditional Hyderabadi and
          Mughlai cuisine to contemporary favorites.
        </p>
      </section>

      <section className="menu-container">
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <img
                src={`/images/${item.image}`}
                alt={item.name}
              />

              <h2>{item.name}</h2>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>{item.description}</p>

              <div className="price">₹{item.price}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;