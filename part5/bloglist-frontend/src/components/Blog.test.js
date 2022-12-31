import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
	const blog = {
		title: "Testing Blog",
		author: "Test",
		likes: 3,
		url: "www.google.com",
		user: {
			name: "Testman",
		},
	};
	test("renders main content but not likes or url", () => {
		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector(".mainInfo");
		expect(div).toHaveTextContent("Testing Blog by Test");

		const div2 = container.querySelector(".subInfo");
		expect(div2).toHaveStyle("display: none");
	});

	test("renders sub content if button view is clicked", async () => {
		const { container } = render(<Blog blog={blog} />);

		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		const div = container.querySelector(".subInfo");
		expect(div).not.toHaveStyle("display: none");
	});

	test("clicking two times the button calls event handler twice", async () => {
		const mockHandler = jest.fn();

		render(<Blog blog={blog} handleAddLike={mockHandler} />);

		const user = userEvent.setup();
		const button = screen.getByText("like");
		await user.click(button);
		await user.click(button);

		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});
