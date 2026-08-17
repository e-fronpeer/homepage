import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { BusinessInquiryNotice } from '../components/sections/BusinessInquiryNotice';
import { Origin } from '../components/sections/Origin';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <BusinessInquiryNotice />
                <Origin />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
