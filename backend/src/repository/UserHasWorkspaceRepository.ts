import { EntityRepository, Repository } from 'typeorm';
import { RowDataPacket } from 'mysql2';
import { workspaceListPageLimitCount } from '@enum';
import UserHasWorkspace from '../model/UserHasWorkspace';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
@EntityRepository(UserHasWorkspace)
export default class UserHasWorkspaceRepository extends Repository<UserHasWorkspace> {
  findAndEachCount(userId: number, page: number): Promise<undefined | RowDataPacket[]> {
    const subquery = this.createQueryBuilder('usercount')
      .select('usercount.workspaceId', 'id')
      .addSelect('COUNT(*)', 'count')
      .groupBy('usercount.workspaceId');

    const workspaces = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.workspace', 'workspace')
      .select('workspace.name', 'name')
      .addSelect('user.workspaceId', 'id')
      // eslint-disable-next-line max-len
      .leftJoinAndSelect(`( ${subquery.getQuery()} )`, 'jointable', 'user.workspaceId = jointable.id')
      .where('user.userId = :userId', { userId })
      .offset(page)
      .limit(workspaceListPageLimitCount)
      .getRawMany();

    return workspaces;
  }
}
