import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repository/UserRepository';
import WorkspaceRepository from '../repository/WorkspaceRepository';
import UserHasWorkspaceRepository from '../repository/UserHasWorkspaceRepository';
import UserHasWorkspace from '../model/UserHasWorkspace';

const { BAD_REQUEST, OK } = StatusCodes;

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getCustomRepository(UserRepository).find();
    return res.status(OK).json({ users });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function getOneUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const users = await getCustomRepository(UserRepository).findOne(id);
    return res.status(OK).json({ users });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function updateOneUser(req: Request, res: Response) {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { account, email, isLocal, password } = req.body;
  try {
    if (Object.keys(req.body).length === 0) throw new Error('no user data in body');
    const userById = await getCustomRepository(UserRepository).findOneOrFail(id);
    userById.account = account || userById.account;
    userById.email = email || userById.email;
    userById.local = isLocal || userById.local;
    userById.password = password || userById.password;
    const users = await getCustomRepository(UserRepository).save(userById);
    return res.status(OK).json({ users });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function addOneUser(req: Request, res: Response) {
  const user = req.body;
  try {
    if (Object.keys(user).length === 0) throw new Error('no user data in body');
    const users = await getCustomRepository(UserRepository).save(user);
    return res.status(OK).json({ users });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getCustomRepository(UserRepository).findOneOrFail(id);
    await getCustomRepository(UserRepository).remove(user);
    return res.status(OK).end();
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function addUserToWorkspace(req: Request, res: Response) {
  try {
    const { userId, workspaceId } = req.body;
    // bind with promise all
    const user = await getCustomRepository(UserRepository).findOne({
      where: [{ id: userId }],
    });
    const workspace = await getCustomRepository(WorkspaceRepository).findOne({
      where: [{ id: workspaceId }],
    });

    if (!user) {
      throw new Error(`user ${userId} does not exist`);
    }
    if (!workspace) {
      throw new Error(`workspace ${workspaceId} does not exist`);
    }

    const userHasWorkspace: UserHasWorkspace = new UserHasWorkspace();
    userHasWorkspace.description = '';
    userHasWorkspace.nickname = user.account;
    userHasWorkspace.workspaceId = Number(workspaceId);
    userHasWorkspace.userId = Number(userId);
    userHasWorkspace.workspace = workspace;
    userHasWorkspace.user = user;

    await getCustomRepository(UserHasWorkspaceRepository).save(userHasWorkspace);
    return res.status(OK).json({ userHasWorkspace });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}

export async function getAllUsersWithChannelInfo(req: Request, res: Response) {
  try {
    const { workspaceId, channelId } = req.query;
    const users = await getCustomRepository(UserRepository).findAllUsersWithChannelInfo(
      String(workspaceId),
      String(channelId),
    );
    return res.status(OK).json({ users });
  } catch (e) {
    return res.status(BAD_REQUEST).json(e);
  }
}
