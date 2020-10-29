describe("blog app", () => {
	beforeEach(() => {
		cy.request("POST", "http://localhost:3001/api/testing/reset")

		const user = {
			name: "Joe",
			username: "joe",
			password: "joe"
		}
		cy.request("POST", "http://localhost:3001/api/users/", user)

		cy.visit("http://localhost:3000")
	})

	it("Login form is shown", () => {
		cy.contains("Log in to application")
		cy.contains("username")
		cy.contains("password")
		cy.get("#username")
		cy.get("#password")
    })
    
    it("Correct credentials leads to successful login", () => {
        cy.get('#username').type("joe")
        cy.get("#password").type("joe")
        cy.get("#loginButton").click()
        cy.contains("Welcome back joe")
    })

    it("Incorrect credentials leads to failed login", () => {
        cy.get('#username').type("joe")
        cy.get("#password").type("shmoe")
        cy.get("#loginButton").click()
        cy.get("#errorMessage").should("contain", "invalid credentials")
        cy.get("#errorMessage").should("have.css", "color", 'rgb(255, 0, 0)')
        //cy.contains("invalid credentials")
    })
})
