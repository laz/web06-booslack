import styled from 'styled-components';
import { theme } from 'styled-tools';
import { BeatLoader } from 'react-spinners';
import Label from '@atoms/Label';
import LabeledButton from '@atoms/LabeledButton';
import SelectWorkspace from '@molecules/SelectWorkspace';
import BrowseChannelHeader from '@molecules/BrowseChannelHeader';
import { defaultTheme } from '@global/theme';
import { flexAlignCenter, hoverChangeColor } from '@global/mixin';

export const StyledHeader = styled(BrowseChannelHeader)`
  min-width: 300px;

  background-color: ${theme('smallHeaderColor', defaultTheme.smallHeaderColor)};
  z-index: 3;
`;

export const Container = styled.main`
  position: relative;
  width: 55vw;
  min-width: 300px;
  background-color: #fff;
  margin-top: 30vh;
  border-radius: 9px;
  position: relative;

  overflow-y: visible;

  margin-bottom: 30vh;
`;

export const WorkspaceListContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:first-child) {
    border-top: 1px solid #ebeaeb;
  }
  & > :last-child {
    color: #1264a3;
  }
`;

export const StyledDiv = styled.div`
  width: inherit;
  height: inherit;

  display: flex;
  background-color: #fff;

  flex-direction: row;
  justify-content: space-between;
  overflow: visible;
  ${hoverChangeColor}

  & > * {
    margin: 10px 20px 3px 20px;
  }
`;

export const StyledLabel = styled(Label)`
  min-width: 500px;
`;

export const StyledSelectWorkspace = styled(SelectWorkspace)``;

export const StyledLabeledButton = styled(LabeledButton)`
  width: 80px;
  height: 60px;
  color: ${theme('titleText', defaultTheme.titleText)};
  background-color: ${theme('backgroundColor', defaultTheme.backgroundColor)};

  &:hover {
    color: ${theme('backgroundColor', defaultTheme.backgroundColor)};
    background-color: ${theme('titleText', defaultTheme.titleText)};
  }
`;

export const SpinnerContainer = styled.div`
  width: 55vw;
  min-width: 300px;
  height: 60px;

  ${flexAlignCenter}
`;

export const LoadingSpinner = styled(BeatLoader)`
  background-color: ${theme('backgroundColor', defaultTheme.backgroundColor)};
`;

export default Container;
