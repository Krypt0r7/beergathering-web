import styled from 'styled-components';

interface HeadingProps {
  dark: boolean
}

const Heading = styled.h1<HeadingProps>`
  font-size: 1em;
  white-space: nowrap;
  ${({ dark }) => (dark ? 'color: white;' : 'color: #333;')}
`


export default Heading;
