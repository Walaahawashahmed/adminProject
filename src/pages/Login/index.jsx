import imageSrc from "../../assets/login.png";
import {
  CustomCheckbox,
  Image,
  BodyWrapper,
  Container,
  ContentWrapper,
  MediaHalf,
  Wrapper,
  Options,
  Paragraph,
  StyledLink,
  FormHeading,
} from "../../Components/CommonStyles";
import { LoginForm } from "./styles";
import { Button } from "../../Components/Button/styles";
import { Input } from "../../Components/Input/styles";

export default function Login() {
  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <FormHeading>Welcome Back!</FormHeading>
              <LoginForm>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <Input type="email" name="email" id="email" />
                </div>

                <div className="password">
                  <label htmlFor="password">Password</label>
                  <Input type="password" name="password" id="password" />
                </div>

                <Options>
                  <div className="remember">
                    <label htmlFor="remember">
                      <Input type="checkbox" id="remember" />
                      <CustomCheckbox />
                      Remember me
                    </label>
                  </div>

                  <StyledLink to="/resetpassword">Forget Password?</StyledLink>
                </Options>

                <Button bgColor="#b58c67" color="#fff" hoverBgColor="#a57a55">
                  Sign in
                </Button>
                <p>
                  Don't have an account?{" "}
                  <StyledLink to="/signup">sign up</StyledLink>
                </p>
              </LoginForm>
            </ContentWrapper>
          </BodyWrapper>

          <MediaHalf>
            <Image src={imageSrc}></Image>
            <Paragraph>
              You don't build a business, you build the people, then people
              build the business.
            </Paragraph>
          </MediaHalf>
        </Container>
      </Wrapper>
    </>
  );
}
