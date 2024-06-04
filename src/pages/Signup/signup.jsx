import imageSrc from "../../assets/signup.png";
import { useForm } from "react-hook-form";
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
import axios from "axios";
import { getLocalStorage } from "../../Services/LocalStorage";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const userToken = getLocalStorage("userToken");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    console.log(userToken);
    console.log(data);
    await axios({
      method: "post",
      url: "http://localhost:3011/admin",
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.confirmPassword,
        role: "subAdmin",
      },
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <FormHeading style={{ marginTop: "10px" }}>
                Create Sub Admin
              </FormHeading>
              <SignupForm onSubmit={handleSubmit(onSubmit)}>
                <div className="name">
                  <label htmlFor="first_name">Full Name</label>
                  <div>
                    <Input
                      required
                      type="text"
                      name="email"
                      id="email"
                      {...register("name", {
                        required: "name is required",
                      })}
                    />
                  </div>
                </div>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <Input
                    required
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>

                <div className="password">
                  <label htmlFor="password">Password</label>
                  <Input
                    required
                    type="password"
                    name="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>

                <div className="password">
                  <label htmlFor="password">Confirm Password</label>
                  <Input
                    required
                    type="password"
                    name="password"
                    id="password"
                    {...register("confirmPassword", {
                      required: "Password is required",
                    })}
                  />
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  bgcolor="#15AABF"
                  color="#fff"
                  hoverbgcolor="#53e5f8"
                >
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
