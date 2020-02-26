import styled from 'styled-components';

export const DivRadio = styled.div<{bgColor: string, color: string}>`
  width: 1.4rem;
  height: 1.4rem;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  text-align: center;
  line-height: 1.4rem;
  border-radius: 0.7rem;
  border: 1px solid #006CFF;
`