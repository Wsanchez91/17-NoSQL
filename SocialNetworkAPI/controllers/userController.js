const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id).populate('thoughts friends');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } }, { new: true });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
