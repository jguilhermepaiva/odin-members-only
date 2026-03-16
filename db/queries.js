const pool = require("./pool");

async function createUser(firstName, lastName, username, hashedPassword) {
  await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [
    firstName,
    lastName,
    username,
    hashedPassword,
  ]);
}

async function updateMembershipStatus(userId){
  await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [userId]);
}

async function createMessage(title, text, userId) {
  await pool.query("INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)", [
    title,
    text,
    userId
  ]);
}

async function getAllMessages() {
 const { rows } = await pool.query(`
    SELECT messages.*, users.first_name, users.last_name 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY timestamp DESC
  `);
  return rows;
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

async function updateAdminStatus(userId){
  await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [userId]);
}

module.exports = {
  createUser,
  updateMembershipStatus,
  createMessage,
  getAllMessages,
  deleteMessage,
  updateAdminStatus
};
