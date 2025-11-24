import { motion } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// IMPORT THE CURSOR
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-slate-900"
    >
      {/* ADD CURSOR HERE */}
      <CustomCursor />

      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubActivity />
      <Contact />
      <Footer />
    </motion.div>
  );
}

export default App;
