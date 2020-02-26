import styled from 'styled-components';

export const Btn = styled.span<{color: string}>`
  display: inline-block;
  width: 6rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 25px;
  color: #FFFFFF;
  background: ${props => props.color}
`