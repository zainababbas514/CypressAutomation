import Header from "./components/header";
import TopMenu from "./components/topMenu";
import FeaturedProducts from "./components/featuredProducts";

module.exports = class HomePage {

    header() {
        return new Header()
    }

    topMenu() {
        return new TopMenu()
    }

    featuredProducts() {
        return new FeaturedProducts()
    }
}