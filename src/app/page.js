import Header from "@/components/ui/Header";
import Landing from "@/components/sections/home/Landing";
import Shop from "@/components/sections/shop/Shop";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Landing />
        <Shop />
      </main>
    </>
  );
}
