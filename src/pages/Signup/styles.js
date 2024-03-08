import styled from "styled-components";
import { Form } from "../../Components/CommonStyles";

export const SignupForm = styled(Form)`
  & > .name div {
    display: flex;
    gap: 10px;

    input {
      flex-grow: 1;
    }
  }

  & > .name,
  & > .password,
  & > .email {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
