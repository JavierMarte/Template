// Create (POST): /accounts/add-member - Add a new member (existing user)
// Read (POST): /accounts/get-members/:account_id - Get a list of members of the specified account
// Update (PUT): /accounts/get-member/:user_id - Update a member's details
// Delete (PUT): /accounts/delete-member/:user_id - Mark a member as deleted

const express = require('express');
const router = express.Router();
const { accountHandler } = require('../handlers/api')

// Create (POST): /accounts/add-member - Add a new member (existing user)
router.post('/add-member', accountHandler.createAccountHandler);

// Read (POST): /accounts/get-members/:account_id - Get a list of members of the specified account
router.post('/get-all-members/', accountHandler.getAllMembersHandler);

// Update (PUT): /accounts/get-member/:user_id - Update a member's details
router.put('/update-member/:user_id', accountHandler.updateMemberHandler);

// Delete (PUT): /accounts/delete-member/:user_id - Mark a member as deleted
router.put('/delete-member/:user_id', accountHandler.deleteMemberHandler);

module.exports = router;