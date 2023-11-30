import Categories from "./Categories"
import Logo from "./Logo"
import Roadmap from "./Roadmap"


const InfoPanel = () => {
  return (
    <nav className="lg:w-1/4 flex lg:block justify-between sm:gap-4 md:h-48 flex-col sm:flex-row">
        <Logo />
        <Categories />
        <Roadmap />
    </nav>
  )
}

export default InfoPanel