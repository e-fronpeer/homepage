import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Origin } from '../components/sections/Origin';
import { Services } from '../components/sections/Services';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <Origin />
                <Services />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
