import aboutImage from "../assets/about.jpg";
import chef1 from "../assets/chef1.jpg";
import chef2 from "../assets/chef2.jpg";
import chef3 from "../assets/chef3.jpg";

import "../styles/about.css";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-section">
        <h1>About Nawabs Restaurant</h1>
        <p>Learn more about our story and values.</p>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-image">
          <img src={aboutImage} alt="About Nawabs Restaurant" />
        </div>

        <div className="about-text">
          <h2>Our Story</h2>

          <p>
            Nawabs Restaurant was founded with a passion for bringing the rich
            flavors of Hyderabadi and Mughlai cuisine to our community.
            Our chefs use traditional recipes and the finest ingredients to
            create unforgettable dining experiences.
          </p>

          <h2>Our Values</h2>

          <ul>
            <li>Authenticity</li>
            <li>Quality Ingredients</li>
            <li>Customer Satisfaction</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>

        <p>
          Our dedicated team of chefs and staff work tirelessly
          to ensure every visit is memorable.
        </p>

        <div className="team-members">

          <div className="team-member">
            <img src={chef1} alt="Head Chef" />
            <h3>Chef A</h3>
            <p>Head Chef</p>
          </div>

          <div className="team-member">
            <img src={chef2} alt="Pastry Chef" />
            <h3>Chef B</h3>
            <p>Pastry Chef</p>
          </div>

          <div className="team-member">
            <img src={chef3} alt="Sous Chef" />
            <h3>Chef C</h3>
            <p>Sous Chef</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;