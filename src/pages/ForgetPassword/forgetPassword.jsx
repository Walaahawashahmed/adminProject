import imageSrc from "../../assets/forget-password.png";
import {
  Image,
  BodyWrapper,
  Container,
  ContentWrapper,
  MediaHalf,
  Wrapper,
  Paragraph,
  StyledLink,
} from "../../Components/CommonStyles";
import { Button } from "../../Components/Button/styles";
import { Input } from "../../Components/Input/styles";
import { ForgetPasswordForm, Heading, Hint } from "./styles";

export default function ForgetPassword() {
  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <Heading>Forget Password</Heading>
              <Hint>
                Type your authorised email address to receive reset password
                link.
              </Hint>
              <ForgetPasswordForm>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <Input type="email" name="email" id="email" />
                </div>

                <Button bgColor="#15AABF" color="#fff" hoverBgColor="#53e5f8">
                  Send!
                </Button>
                <p>
                  Already have an account?{" "}
                  <StyledLink to="/login">Login!</StyledLink>
                </p>
              </ForgetPasswordForm>
            </ContentWrapper>
          </BodyWrapper>

          <MediaHalf>
            <Image src={imageSrc}></Image>
            <Paragraph>
              You dont build a business, you build the people, then people build
              the business.
            </Paragraph>
          </MediaHalf>
        </Container>
      </Wrapper>
    </>
  );
}
