const express = require('express');
const router = express.Router();
const Member = require('../schemas/member_schema');

router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json({ members });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newMember = new Member({ name, email, });
        await newMember.save();
        res.json({ message: 'Member Successfully added',});
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({ error: 'Error adding member' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const { name, email } = req.body;

        const updatedMember = await Member.findByIdAndUpdate(memberId, { name, email }, { new: true });

        if (!updatedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json({ message: 'Member updated successfully' });
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ error: 'Error updating member' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const deletedMember = await Member.findByIdAndDelete(memberId);

        if (!deletedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ error: 'Error deleting member' });
    }
});

module.exports = router;
