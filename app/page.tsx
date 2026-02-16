import Hero from '@/components/Hero';
import Story from '@/components/Story';
import MapSection from '@/components/MapSection';
import SignatureCounter from '@/components/SignatureCounter';
import SignatureForm from '@/components/SignatureForm';
import SocialShare from '@/components/SocialShare';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <MapSection />
      <SignatureCounter />
      <SignatureForm />
      <SocialShare />
      <Footer />
    </main>
  );
}
