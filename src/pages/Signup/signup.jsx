import imageSrc from "../../assets/signup.png";
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
import { SignupForm } from "./styles";
import { Button } from "../../Components/Button/styles";
import { Input } from "../../Components/Input/styles";

export default function Signup() {
  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <FormHeading>Get Started</FormHeading>
              <SignupForm>
                <div className="name">
                  <label htmlFor="first_name">Full Name</label>
                  <div>
                    <Input type="text" name="first_name" id="first_name" />
                    <Input type="text" name="last_name" id="last_name" />
                  </div>
                </div>
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
                      Accept All terms and Conditions
                    </label>
                  </div>
                </Options>

                <Button bgColor="#b58c67" color="#fff" hoverBgColor="#a57a55">
                  Sign Up
                </Button>
                <p>
                  Already have an account?{" "}
                  <StyledLink to="/login">Login!</StyledLink>
                </p>
              </SignupForm>
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
