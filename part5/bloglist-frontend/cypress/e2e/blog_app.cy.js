describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "admin",
			username: "root",
			password: "root",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("log in to application");
		cy.contains("username");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get(".username").type("root");
			cy.get(".password").type("root");
			cy.contains("login").click();

			cy.contains("admin logged-in");
		});

		it("fails with wrong credentials", function () {
			cy.get(".username").type("root");
			cy.get(".password").type("root2");
			cy.contains("login").click();

			cy.get(".notificationError").contains(
				"Wrong username or password."
			);
		});
	});

	describe("when user is logged-in", function () {
		beforeEach(function () {
			cy.request("POST", "http://localhost:3003/api/login", {
				username: "root",
				password: "root",
			}).then((response) => {
				localStorage.setItem(
					"loggedUser",
					JSON.stringify(response.body)
				);
				cy.visit("http://localhost:3000");
			});
		});

		it("A blog can be created", function () {
			cy.contains("new blog").click();
			cy.get(".title").type("test");
			cy.get(".author").type("test");
			cy.get(".url").type("test");
			cy.get(".create").click();

			cy.contains("test by test");
		});

		it("A blog can be liked", function () {
			cy.contains("new blog").click();
			cy.get(".title").type("test");
			cy.get(".author").type("test");
			cy.get(".url").type("test");
			cy.get(".create").click();
			cy.contains("view").click();
			cy.contains("like").click();

			cy.contains("likes 1");
		});

		it("A blog can be deleted by the creator", function () {
			cy.contains("new blog").click();
			cy.get(".title").type("test");
			cy.get(".author").type("test");
			cy.get(".url").type("test");
			cy.get(".create").click();
			cy.contains("view").click();
			cy.contains("remove").click();

			cy.contains("test by test").should("not.exist");
		});

		it("The blog with most likes is the first on the list", function () {
			cy.contains("new blog").click();
			cy.get(".title").type("Less likes");
			cy.get(".author").type("test");
			cy.get(".url").type("test");
			cy.get(".create").click();

			cy.get(".title").clear();
			cy.get(".author").clear();
			cy.get(".url").clear();

			cy.contains("new blog").click();
			cy.get(".title").type("Most likes");
			cy.get(".author").type("test");
			cy.get(".url").type("test");
			cy.get(".create").click();

			cy.get(".blog").eq(1).contains("view").click();
			cy.get(".blog").eq(1).contains("like").click();

			cy.get(".blog").eq(0).should("contain", "Most likes by test");
		});
	});
});
