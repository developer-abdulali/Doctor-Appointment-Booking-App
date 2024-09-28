import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import SpecialityMenu from "../../components/SpecialityMenu/SpecialityMenu";
import TopDoctors from "../../components/TopDoctors/TopDoctors";

const Home = () => {
  return (
    <>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </>
  );
};
export default Home;
