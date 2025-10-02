import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Container } from "@react-email/container";

export default function OtpEmail({ otp }) {
  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Heading>Your OTP Code</Heading>
        <Text>Use the following OTP to complete your verification:</Text>
        <Text style={{ fontSize: "22px", fontWeight: "bold" }}>{otp}</Text>
        <Text>This code will expire in 5 minutes.</Text>
      </Container>
    </Html>
  );
}
