import Header from "@/components/ui/Header";
import SectionHashObserver from "@/components/ui/SectionHashObserver";
import Landing from "@/components/sections/home/Landing";
import Shop from "@/components/sections/shop/Shop";

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionHashObserver />
      <main>
        <Landing />
        <Shop />
      </main>
    </>
  );
}
