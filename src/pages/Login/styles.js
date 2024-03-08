import styled from "styled-components";
import { Form } from "../../Components/CommonStyles";

export const LoginForm = styled(Form)`
  & > .password,
  & > .email {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
