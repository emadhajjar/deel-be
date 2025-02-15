const getProfile = async (request, res, next) => {
  const { Profile } = request.app.get('models');
  const profile = await Profile.findOne({
    where: { id: request.get('profile_id') || 0 },
  });
  if (!profile) return res.status(401).end();
  request.profile = profile;
  next();
};
module.exports = { getProfile };
