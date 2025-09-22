import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Origin } from '../components/sections/Origin';
import { Services } from '../components/sections/Services';
import { Timeline } from '../components/sections/Timeline';
import { Founder } from '../components/sections/Founder';
import { Contact } from '../components/sections/Contact';
import { Toaster } from '@/components/ui/toaster';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <Origin />
                <Services />
                <Timeline />
                <Founder />
                <Contact />
            </main>
            <Footer />
            <Toaster />
        </div>
    );
};

export default Home;