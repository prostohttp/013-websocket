const Comment = require("../model/Comment");

const addComment = async (req, res) => {
	const { userId, name, comment } = req.query;
	try {
		const newComment = new Comment({
			userId,
			name,
			comment,
		});
		await newComment.save();
	} catch (error) {
		console.log(error);
	}

	res.json("comment added");
};

const getAllComments = async (req, res) => {
	const { id } = req.params;
	const comments = await Comment.find({ userId: id });
	res.json(comments);
};

const deleteComment = async (req, res) => {
	const { id } = req.params;
	await Comment.deleteMany({ userId: id });
	res.json("comment deleted");
};

module.exports = {
  add: addComment,
  getAll: getAllComments,
  delete: deleteComment,
}