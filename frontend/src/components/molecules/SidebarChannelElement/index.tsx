import React from 'react';
import Label from '@atoms/Label';
import { Container, StyledLabel } from './styles';

interface Props {
  onClick: () => void;
  label: string;
  isPrivate: boolean;
  onContextMenu: (e) => void;
}

const SidebarChannelElement = ({
  onClick,
  label,
  isPrivate,
  onContextMenu,
}: Props): JSX.Element => {
  return (
    <Container onClick={onClick} onContextMenu={onContextMenu}>
      <StyledLabel>
        <Label text={isPrivate ? '🔒' : '#'} />
      </StyledLabel>
      <Label text={label.length < 18 ? label : `${label.substr(0, 18)}...`} />
    </Container>
  );
};

export default SidebarChannelElement;
