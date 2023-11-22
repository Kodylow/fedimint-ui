import React from 'react';
import { Box, Flex, Link, useTheme } from '@chakra-ui/react';

export const Footer = () => {
  const theme = useTheme();

  interface CustomLinkProps {
    href: string;
    title: string;
  }

  const CustomLink = ({ href, title }: CustomLinkProps) => {
    return (
      <Link
        _hover={{ textDecoration: 'underline' }}
        fontSize={{ base: 'xs', sm: 'sm', md: 'sm', lg: 'sm' }}
        fontWeight='500'
        color={theme.colors.gray[600]}
        transition={`text-decoration 1s ease-in-out`}
        href={href}
        target='_blank'
        rel='noreferrer'
        w='fit-content'
      >
        {title}
      </Link>
    );
  };

  return (
    <Flex
      bgColor={theme.colors.gray[50]}
      p='28px'
      w='100%'
      direction={{ base: 'column-reverse', sm: 'row' }}
      align='center'
      justify='center'
    >
      <Box display='flex' gap={4} order={{ base: 1, sm: 2 }}>
        <CustomLink
          title='© The Fedimint Developers'
          href='https://fedimint.org'
        />
        <CustomLink title='Discord' href='https://discord.gg/nzqta7AZ' />
        <CustomLink title='Github' href='https://github.com/fedimint' />
      </Box>
    </Flex>
  );
};
