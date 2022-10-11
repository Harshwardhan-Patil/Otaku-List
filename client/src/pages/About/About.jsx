import NavBar from "../../components/NavBar/NavBar";
import "./About.css";

function About() {
  return (
    <>
      <NavBar />
      <div className="about">
        <div className="about__owner">
          <h3>
            This website was made by <strong>Harshwardhan Patil</strong> in
            2022.
          </h3>
          <h3>
            Website made with the pourpose of study <strong>MERN Stack</strong>
          </h3>
          <a href="https://animedia.netlify.app/" target="__blank">
            Inspiration of the Project
          </a>
          <h3>
            This project uses <strong>Jinkan FREE API</strong>{" "}
          </h3>
        </div>
        <div className="about__connection">
          <h3>Connect with me:</h3>
          <a href="https://twitter.com/harshp3302" target="__blank">
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/harshwardhan-patil-55758b218/"
            target="__blank"
          >
            Linkedin
          </a>
        </div>
      </div>
    </>
  );
}

export default About;
