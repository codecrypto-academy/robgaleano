import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Text, Button, Container } from '@radix-ui/themes';

const NotFound: React.FC = () => {
  return (
    <Container size="3">
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        gap="5" 
        style={{ 
          minHeight: 'calc(100vh - 100px)', 
          padding: '2rem' 
        }}
      >
        <Heading size="9" align="center">404</Heading>
        <Heading size="6" align="center">Page Not Found</Heading>
        <Text align="center" size="3">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button size="3" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </Flex>
    </Container>
  );
};

export default NotFound;
