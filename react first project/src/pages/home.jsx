import hero from "../assets/hero1.png";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate=useNavigate();
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <img
          src={hero}
          alt="The Nawab's Restaurant"
          className="hero-image"
        />

        <div className="hero-content">
          <h1>Welcome to Nawabs Restaurant</h1>

          <p>
            Experience the finest dining with authentic Hyderabadi and Mughlai
            cuisine.
          </p>
                    <div className="buttons">
            <button onClick={()=>navigate("/menu")}>
              view Menu
            </button>

            <button onClick={()=>navigate("/reservation")}>
              Book a Table</button>
          </div>
        </div>
      </section>


      {/* Popular Dishes Section */}
      <section className="popular-dishes-section">
        <h2>Popular Dishes</h2>

        
          <div className="dish-card">
            <h3>Chicken Biryani</h3>
            <p>
              Experience the rich flavors of our signature chicken biryani,
              crafted with aromatic spices and tender chicken.
            </p>
          </div>

          <div className="dish-card">
            <h3>Mutton Biryani</h3>
            <p>
              Indulge in the exquisite taste of our mutton biryani,
              slow-cooked to perfection.
            </p>
          </div>

          <div className="dish-card">
            <h3>Paneer Butter Masala</h3>
            <p>
              Savor the creamy and flavorful paneer butter masala,
              a vegetarian delight.
            </p>
          </div>
      </section>

      <div className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>
          At Nawabs Restaurant, we pride ourselves on delivering an exceptional
          dining experience. Our chefs use the finest ingredients to create
          dishes that are both delicious and memorable. Whether you're here for
          a casual meal or a special occasion, we ensure that every visit is
          unforgettable.
        </p>
      </div>

      <div className="location-section">
        <h2>Our Location</h2>
        <p>
          Visit us at our prime location in the heart of the city. We are easily
          accessible and offer a welcoming ambiance for all our guests.
        </p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.225229445193!2d78.3614199771406!3d17.448930783448798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93ab7d8bcc7f%3A0xf8de83173cd01211!2sThe%20Nawaab's%20Restaurant!5e0!3m2!1sen!2sin!4v1784046406328!5m2!1sen!2sin"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    title="The Nawaab's Restaurant Location"
  ></iframe>
</div>


    <div className="footer">
      <p>&copy; 2024 Nawabs Restaurant. All rights reserved.</p>
    </div>
    </>

  );
};

export default Home;