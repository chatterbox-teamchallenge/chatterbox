import { ZodType, z } from "zod";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "../Button/Button";
import ModalWrapper from "../Modal/ModalWrapper";
import { Link } from "react-router-dom";
import axios from "axios";

interface FormProps {
  type: string;
  isConfirmed?: boolean;
}

interface IState {
  inputStates: any;
  isModalVisible: boolean;
}

type FormData = {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export default function Form({ type, isConfirmed }: FormProps) {
  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    inputStates: {
      emailState: "default",
      nameState: "default",
      passwordState: "default",
      repeatPasswordState: "default",
    },
    isModalVisible: false,
  });

  const formSchema: ZodType<FormData> = z
    .object({
      name: z
        .string()
        .regex(/^[a-zA-Z0-9-_]+$/, {
          message:
            "Field must contain only English letters, numbers, hyphens, or underscores",
        })
        .max(20)
        .optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      repeatPassword: z.string().min(6).optional(),
    })
    .refine(
      (data: any) => {
        if (data.password && data.repeatPassword) {
          return data.password === data.repeatPassword;
        }
        return true;
      },
      {
        message: "Passwords do not match",
        path: ["repeatPassword"],
      }
    );

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const isFieldFilled = (fieldName: string | undefined) => !!fieldName;

  const registerUser = (data: FormData) => {
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_ENDPOINT_SIGNUP}`,
        { email: data.email, username: data.name, password: data.password }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = (data: FormData) => {
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_ENDPOINT_LOGIN}`,
        { login: data.name, password: data.password }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitData = (data: FormData) => {
    // SEND DATA TO THE SERVER
    if (type === "register") registerUser(data);
    else if (type === "login") loginUser(data);
  };

  const isFieldCorrect = async (
    fieldName: keyof FormData,
    fieldValue: string | undefined
  ) => {
    await trigger(fieldName);
    console.log(fieldName, isFieldFilled(fieldValue))
    if (fieldName === 'name' && !isFieldFilled(fieldValue))
{    console.log(fieldName) ; return 'correct';}
    else if (isFieldFilled(fieldValue) && errors[fieldName] === undefined)
      return "correct";
    return !isFieldFilled(fieldValue)
      ? "default"
      : errors[fieldName]?.message || "default";
  };

  const updateFieldStates = async (field: keyof FormData) => {
    let fieldState = await isFieldCorrect(`${field}`, field);

    let newInputStates = {
      [`${field}State`]: fieldState,
    };

    // if (field === "name") {
    //   newInputStates = { [`${field}State`]: "default" };
    // }

    updateState({ inputStates: { ...state.inputStates, ...newInputStates } });
  };

  const toggleModal = () => {
    updateState({ isModalVisible: !state.isModalVisible });
  };

  return (
    <form className="form__wrapper" onSubmit={handleSubmit(submitData)}>
      {type === "register" && !isConfirmed && (
        <div className="form">
          <Input
            type="email"
            state={state.inputStates.emailState}
            placeholder="Your email"
            registerType={register("email")}
            handleBlur={() => updateFieldStates("email")}
          />
          <Button text={"Next"} isValid={isValid} onClick={toggleModal} />
          <ModalWrapper
            isModalVisible={state.isModalVisible}
            onBackdropClick={toggleModal}
          />
        </div>
      )}
      {type === "register" && isConfirmed && (
        <div className="form">
          <Input
            type="email"
            state={state.inputStates.emailState}
            placeholder="Your email"
            registerType={register("email")}
            handleBlur={() => updateFieldStates("email")}
          />
          <Input
            type="name"
            state={state.inputStates.nameState}
            placeholder="Your name"
            registerType={register("name")}
            handleBlur={() => updateFieldStates("name")}
          />
          <Input
            type="password"
            state={state.inputStates.passwordState}
            placeholder="Password"
            registerType={register("password")}
            handleBlur={() => updateFieldStates("password")}
          />
          <Input
            type="password"
            state={state.inputStates.repeatPasswordState}
            placeholder="Repeat password"
            registerType={register("repeatPassword")}
            handleBlur={() => updateFieldStates("repeatPassword")}
          />
          <Button
            text={"Next"}
            isValid={isValid}
            onClick={handleSubmit(submitData)}
          />
        </div>
      )}
      {type === "login" && (
        <div className="form">
          <Input
            type="name"
            state={state.inputStates.nameState}
            placeholder="Your email or name"
            registerType={register("name")}
            handleBlur={() => updateFieldStates("name")}
          />
          <Input
            type="password"
            state={state.inputStates.passwordState}
            placeholder="Password"
            registerType={register("password")}
            handleBlur={() => updateFieldStates("password")}
          />
          <Link to="/">
            <p className="forgot__password__link">Forgor password?</p>
          </Link>
          <Button
            text="Next"
            isValid={isValid}
            onClick={handleSubmit(submitData)}
          />
        </div>
      )}
    </form>
  );
}