import chickenTikka from "../assets/chicken-tikka.jpg";
import tigerPrawns from "../assets/tiger-prawns.jpg";
import chicken65 from "../assets/chicken65.jpg";
import chickenBiryani from "../assets/chicken-biryani.jpg";
import muttonBiryani from "../assets/mutton-biryani.jpg";
const Menu = () => {
  return (
    <>
    <section className="menu-section">
      <h1>Our Menu</h1>
      <p>Explore our diverse range of dishes, from traditional Hyderabadi and Mughlai cuisine to contemporary favorites.</p>
    </section>

    <section className="menu-container">
      <h2>Starters</h2>
      <div className="menu-grid">

      <div className="menu-car">
        <img src={chickenTikka} alt="Chicken Tikka"/>
        <h3>Chicken Tikka</h3>
        <p>Marinated chicken pieces grilled to perfection, served with mint chutney.</p>
        <div className="price">₹350</div>
      </div>

      <div className="menu-card">
        <img src={tigerPrawns} alt="Tiger Prawns" />
        <h3>Tiger Prawns in Garlic Ginger Soy Sauce</h3>
        <p>Succulent tiger prawns cooked in a flavorful garlic ginger soy sauce.</p>
        <div className="price">₹350</div>
      </div>

      <div className="menu-card">
        <img src={chicken65} alt="Chicken 65" />
        <h3>Chicken 65</h3>
        <p>Spicy deep-fried chicken bites, a popular South Indian appetizer.</p>
        <div className="price">₹350</div>
      </div>
      </div>

      <h2>Main Courses(Biryani) </h2>

      <div className="menu-grid">
        
      <div className="menu-card">
        <img src={chickenBiryani} alt="chicken biryani"/>
        <h3>Chicken Biryani</h3>
        <p>Aromatic basmati rice layered with marinated chicken and spices.</p>
        <div className="price">₹350</div>
      </div>

      <div className="menu-card">
        <img src={muttonBiryani} alt="mutton biryani"/>
        <h3>Mutton Biryani</h3>
        <p>Fragrant rice cooked with tender mutton and a blend of spices.</p>
        <div className="price">₹350</div>
      </div>
    </div>






    </section>
    </>
  );
  }
export default Menu
