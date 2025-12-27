module.exports = class TopMenu {
    elements = {
        categoryMenuItems: (name) => cy.contains(".header-menu .top-menu > li", name),
        categoriesSubList: (category) => category.find(".sublist"),

    }

    openCategory(categoryName, subCategory = null) {

        this.elements.categoryMenuItems(categoryName)
            .should('be.visible')
            .then((category) => {
                if (subCategory && this.elements.categoriesSubList(category).length > 0) {
                    cy.wrap(category).trigger("mouseover")
                    cy.wrap(this.elements.categoriesSubList(category)).find("li a").contains(subCategory).click()
                } else {
                    cy.wrap(category).click()
                }
            });
    }
}