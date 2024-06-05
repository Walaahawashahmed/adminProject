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
import LocalLinkerLogoComponent from "../../assets/localLinkerLogoComponent";

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

                <Button
                  type="submit"
                  bgcolor="#15AABF"
                  color="#fff"
                  hoverbgcolor="#249dad"
                >
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
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
              <div className="w-50">
                <LocalLinkerLogoComponent color={"#ffffff"} />
              </div>
              <h1 className="display-1 fw-bold">Local Linker</h1>
            </div>
          </MediaHalf>
        </Container>
      </Wrapper>
    </>
  );
}
