export default function stripUser(
  user,
  fields = ['password', 'createdAt', 'updatedAt', '__v']
) {
  let newUser = user.toObject();
  fields.forEach(field => {
    delete newUser[field];
  });
  return newUser;
}
