
module.exports = function setUserInfo (user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  };
}