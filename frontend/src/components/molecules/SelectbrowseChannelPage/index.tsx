import React from 'react';
import { pageLimitCount } from '@enum/index';
import Container, { StyledButton } from './styles';

interface Props {
  dataCount: number;
  cursor: number;
  setCursor: (number) => void;
}

const pageNumber = 5;

const createSpan = (
  cursor: number,
  cursorValue: number,
  dataCount: number,
  setCursor: (arg0: number) => void,
): null | JSX.Element[] => {
  const divContainer = [];

  // eslint-disable-next-line operator-linebreak
  const leftSide =
    cursorValue - pageNumber * pageLimitCount > 0 ? cursor - pageNumber : 0;

  for (
    let i = leftSide * pageLimitCount, index = leftSide, count = 0;
    i < dataCount && count < 10;
    i += pageLimitCount, index += 1, count += 1
  ) {
    divContainer.push(index);
  }

  return divContainer.map((element: number) => {
    return (
      <StyledButton
        type="button"
        isCursor={cursor === element}
        key={`browseCursor${element}`}
        onClick={() => setCursor(element)}
      >
        {element + 1}
      </StyledButton>
    );
  });
};

const SelectbrowseChannelPage = ({
  dataCount,
  cursor,
  setCursor,
}: Props): JSX.Element => {
  const cursorValue = 1 + (cursor - 1) * pageLimitCount;
  const SpanContainer = createSpan(cursor, cursorValue, dataCount, setCursor);

  const moveLeft = (): number => {
    return cursorValue - 10 * pageLimitCount > 0 ? cursor - pageNumber * 2 : 0;
  };

  const moveRight = (): number => {
    return cursorValue + 10 * pageLimitCount < dataCount
      ? cursor + pageNumber * 2 - 1
      : cursor;
  };

  return (
    <Container>
      <StyledButton type="button" onClick={() => setCursor(moveLeft())}>
        {'<'}
      </StyledButton>
      {SpanContainer}
      <StyledButton
        type="button"
        onClick={() => {
          setCursor(moveRight());
        }}
      >
        {'>'}
      </StyledButton>
    </Container>
  );
};

export default SelectbrowseChannelPage;
