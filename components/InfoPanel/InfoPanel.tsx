import Categories from "./Categories"
import Logo from "./Logo"
import Roadmap from "./Roadmap"


const InfoPanel = () => {
  return (
    <nav className="w-1/4">
        <Logo />
        <Categories />
        <Roadmap />
    </nav>
  )
}

export default InfoPanel