

describe("blog app", () => {
	beforeEach(() => {
		cy.request("POST", "http://localhost:3001/api/testing/reset")
		cy.visit("http://localhost:3000")
	})

	it("Login form is shown", () => {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.get("#username")
        cy.get("#password")
	})
})
