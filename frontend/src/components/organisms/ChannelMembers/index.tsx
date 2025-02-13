import React from 'react';
import { useParams } from 'react-router-dom';
import useInputs from '@hook/useInputs';
import { useUserListWithChannelInfoQuery } from '@hook/useUsers';
import Autocomplete from '@atoms/Autocomplete';
import MemberElement from './MemberElement';
import MemberTemplate from './MemberTemplate';
import { Container, ScrollContainer, StyledInput } from './styles';

const Unfiltered = ({ users }: { users: any[] }): JSX.Element => {
  return (
    <>
      <MemberElement key={0} nickname="Add people" email="" />
      {users.map((user) => (
        <MemberElement key={user.id} nickname={user.nickname} />
      ))}
    </>
  );
};

const ChannelMembers = (): JSX.Element => {
  const { workspaceId, channelId }: { workspaceId: string; channelId: string } =
    useParams();
  const [{ input }, onChange, clear] = useInputs({ input: '' });

  const { isLoading, isError, data } = useUserListWithChannelInfoQuery(
    workspaceId,
    channelId,
  );

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;

  return (
    <Container>
      <StyledInput
        placeholder="Find members"
        onChange={onChange}
        name="input"
        value={input}
      />
      <ScrollContainer>
        {input ? (
          <Autocomplete
            input={input}
            filter={(user) => user.nickname.includes(input)}
            filterList={data}
            setValue={() => {}} // open user profile
            ResultTemplate={MemberTemplate}
          />
        ) : (
          <Unfiltered users={data} />
        )}
      </ScrollContainer>
    </Container>
  );
};

export default ChannelMembers;
