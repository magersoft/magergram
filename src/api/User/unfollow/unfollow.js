import { isAuthenticated } from '../../../middlewares';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: {
                id
              }
            }
          }
        });
        await prisma.deleteManyNotifications({
          AND: {
            user: { id: user.id },
            subscriber: { id },
            type: 'SUBSCRIPTION'
          }
        });
        return true;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    }
  }
}
