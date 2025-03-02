export const getSocketUser = (socket, next) => {
  try {
    const user = socket.handshake.auth;
    if (!user) throw createError.Unauthorized();

    // console.log('user', user);

    socket.user = user;

    next();
  } catch (error) {
    logger.error('❌ Error getting user info', error);
    throw createError.InternalServerError();
  }
};
