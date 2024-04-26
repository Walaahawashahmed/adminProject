import imageSrc from "../../assets/login.png";
import { useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare, IconSquareCheck } from "@tabler/icons-react";
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
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../../Services/LocalStorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    console.log(data);
    await axios({
      method: "post",
      url: `http://localhost:3011/auth/login`,
      data: { email: data.email, password: data.password },
    })
      .then((res) => {
        console.log(res);
        setLocalStorage("userToken", res.data.token);
        navigate("/Dashboard/customers");
        notifications.show({
          message: "Login Successful",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
        console.log(getLocalStorage("userToken"));
      })
      .catch((err) => {
        err.response.data.msg;
        notifications.show({
          message: err.response.data.msg || "Something went wrong",
          color: "red",
          autoClose: 2000,
          icon: <IconAlertSquare />,
          classNames: {
            icon: "bg-transparent text-red-500",
          },
        });
      });
  }

  return (
    <>
      <Wrapper>
        <Container>
          <BodyWrapper>
            <ContentWrapper>
              <FormHeading>Welcome Back!</FormHeading>
              <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <Input
                    required
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      // validate: (value) => {
                      //   value === /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Incorrect Email";
                      // },
                    })}
                  />
                  {/* {errors.email && (
                    <p style={{ color: "red" }}>{`${errors.email.message}`}</p>
                  )} */}
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
                  {/* {errors.email && (
                    <p
                      style={{ color: "red" }}
                    >{`${errors.password.message}`}</p>
                  )} */}
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

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  bgcolor="#b58c67"
                  color="#fff"
                  hoverbgcolor="#a57a55"
                >
                  Login
                </Button>
                <p>
                  Dont have an account?{" "}
                  {/* <StyledLink to="/signup">sign up</StyledLink> */}
                </p>
              </LoginForm>
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
