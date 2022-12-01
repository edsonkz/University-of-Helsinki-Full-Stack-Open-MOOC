const _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
	const favoriteBlog = blogs.find((blog) => blog.likes === maxLikes);
	return favoriteBlog.length > 1 ? favoriteBlog[0] : favoriteBlog;
};

const mostBlogs = (blogs) => {
	const blogsByAuthors = _.chain(blogs)
		.groupBy("author")
		.map((value, key) => ({ author: key, blogs: value.length }))
		.value();

	const maxBlogs = Math.max(...blogsByAuthors.map((blog) => blog.blogs));
	const x = blogsByAuthors.find((blog) => blog.blogs === maxBlogs);
	return x.length > 1 ? x[0] : x;
};

const mostLikes = (blogs) => {
	const blogsByAuthors = _.chain(blogs)
		.groupBy("author")
		.map((value, key) => ({
			author: key,
			likes: value.reduce((total, blog) => total + blog.likes, 0),
		}))
		.value();

	const maxLikes = Math.max(...blogsByAuthors.map((blog) => blog.likes));
	const x = blogsByAuthors.find((blog) => blog.likes === maxLikes);
	return x.length > 1 ? x[0] : x;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
