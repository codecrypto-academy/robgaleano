import { Container, Flex, Heading, Text, Box, Card } from "@radix-ui/themes";
import { ShoppingBasket, PackageOpen } from "lucide-react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <Container size="3" className="home-container">
      <Flex direction="column" gap="6" className="py-8">
        <div className="hero-section" style={{ textAlign: "center" }}>
          <Heading size="9" align="center" className="mb-2 text-gradient">
            Welcome to Web 2.5 Basket
          </Heading>
          <Text size="5" align="center" className="text-muted">
            Your decentralized shopping experience with the best of Web2 and Web3
          </Text>
        </div>

        <Flex gap="4" wrap="wrap" className="mt-8">
          <FeatureCard
            to="/products"
            icon={<PackageOpen size={24} />}
            title="Browse Products"
            description="Explore our wide range of products with detailed information"
          />
          <FeatureCard
            to="/shopping-bag"
            icon={<ShoppingBasket size={24} />}
            title="Shopping Bag"
            description="View and manage items in your shopping cart"
          />
        </Flex>
      </Flex>
    </Container>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const FeatureCard = ({ icon, title, description, to }: FeatureCardProps) => (
  <Link to={to} className="feature-card-link">
    <Card className="feature-card">
      <Flex direction="column" gap="2" align="center" className="p-4">
        <Box className="feature-icon">{icon}</Box>
        <Heading size="4">{title}</Heading>
        <Text size="2" align="center" className="text-muted">
          {description}
        </Text>
      </Flex>
    </Card>
  </Link>
);

export default Home;
