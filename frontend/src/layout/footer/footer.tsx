import React from "react";
import { Text, Flex } from "@radix-ui/themes";
import "./footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Text size="2" weight="medium">
          © {currentYear} Web2.5 Basket
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;
