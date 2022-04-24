import Link from 'next/link';
import styled from 'styled-components';

interface LogoProps {
  filter?: string;
  size: number;
}

const SLogo = styled.img<LogoProps>`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  width: ${(props) => `${props.size}px`};
  filter: ${(props) => props.filter ?? ''};
`;

export default function Logo({ filter, size }: LogoProps) {
  return (
    <Link href="/">
      <a>
        <SLogo src="/img/Logo.png" alt="logo" filter={filter} size={size} />
      </a>
    </Link>
  );
}
