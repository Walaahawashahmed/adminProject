import imageSrc from "../../assets/new-password.png";
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
import { Heading, Hint, NewPassowrdForm } from "./styles";

export default function CreateNewPassword() {
  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <Heading>Create new password</Heading>
              <Hint>
                Jangan pake kata sandi yang susah-susah makannya, ngerepotin
                mulu jadi orang.
              </Hint>
              <NewPassowrdForm>
                <div className="password">
                  <label htmlFor="password">New Password</label>
                  <Input type="password" name="password" id="password" />
                </div>

                <div className="re-password">
                  <label htmlFor="rePassword">Confirm Password</label>
                  <Input type="password" name="rePassword" id="rePassword" />
                </div>

                <Button bgColor="#15AABF" color="#fff" hoverBgColor="#53e5f8">
                  Change Password
                </Button>
              </NewPassowrdForm>
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
