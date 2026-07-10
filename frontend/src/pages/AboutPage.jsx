import Navbar from "../components/Navbar";
import About from "../components/About";

function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="pt-24">
                <About />
            </div>
        </>
    );
}

export default AboutPage;