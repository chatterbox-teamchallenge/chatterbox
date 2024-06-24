import { ZodType, z } from "zod";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "../Button/Button";
import ModalWrapper from "../Modal/ModalWrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  setEmail,
  statusCheck,
} from "../../requests/userRequests";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateUser } from "../../redux/reducers/userSlice";
import Checkbox from "../Checkbox/Checkbox";

interface FormProps {
  type: string;
  isConfirmed?: boolean;
}

interface IState {
  inputStates: any;
  isModalVisible: boolean;
  isChecked: boolean;
}

type FormData = {
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export default function Form({ type, isConfirmed }: FormProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
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
    isChecked: false,
  });

  const formSchema: ZodType<FormData> = z
    .object({
      name: z
        .string()
        .regex(/^[A-Za-z0-9_-]*$/, {
          message:
            "Field must be empty or contain only English letters, numbers, hyphens, or underscores",
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
      },
    );

  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const isFieldFilled = (fieldName: string | undefined) => !!fieldName;

  const submitData = async (data: FormData) => {
    // SEND DATA TO THE SERVER
    if (type === "register" && !isConfirmed) {
      const res = await setEmail(data);
      const user = res?.data;
      toggleModal();
      dispatch(updateUser(user));
    } else if (type === "register" && isConfirmed) {
      const token = new URLSearchParams(location.search).get("token");
      const res = await registerUser(token as string, data);
      const user = res?.data;
      dispatch(updateUser(user));
      navigate("/login");
    } else if (type === "login") {
      console.log(state.inputStates.password);
      await loginUser(data);
    }
  };

  const isFieldCorrect = async (
    fieldName: keyof FormData,
    fieldValue: string | undefined,
  ) => {
    await trigger(fieldName);
    if (fieldName === "name" && !isFieldFilled(fieldValue)) {
      return "correct";
    } else if (isFieldFilled(fieldValue) && errors[fieldName] === undefined)
      return "correct";
    return !isFieldFilled(fieldValue)
      ? "default"
      : errors[fieldName]?.message || "default";
  };

  const updateFieldStates = async (field: keyof FormData) => {
    const values = getValues();
    let fieldState = await isFieldCorrect(field, values[`${field}`]);

    let newInputStates = {
      [`${field}State`]: fieldState,
    };

    updateState({ inputStates: { ...state.inputStates, ...newInputStates } });
  };

  const toggleModal = () => {
    updateState({ isModalVisible: !state.isModalVisible });
  };

  function handleCheck() {
    updateState({ isChecked: !state.isChecked });
  }

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
          <Button
            text={"Next"}
            isValid={isValid}
            onClick={handleSubmit(submitData)}
          />
          <ModalWrapper
            isModalVisible={state.isModalVisible}
            onBackdropClick={toggleModal}
          />
        </div>
      )}
      {type === "register" && isConfirmed && (
        <div className="form">
          {/* CHANGE WHEN ENDPOINT FOR EMAIL ONLY WILL BE DONE */}
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
          <Checkbox
            text="I have read the terms and conditions"
            checked={state.isChecked}
            handleClick={handleCheck}
          />
          <Button
            text={"Next"}
            isValid={isValid && state.isChecked}
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
            handleBlur={() => updateFieldStates("name")}
          />
          <Input
            type="password"
            state={state.inputStates.passwordState}
            placeholder="Password"
            registerType={register("password")}
            handleBlur={() => updateFieldStates("password")}
          />
          <Link to="/forgot_password">
            <p className="forgot__password__link">Forgor password?</p>
          </Link>
          <Button
            text="Next"
            isValid={isValid}
            onClick={handleSubmit(submitData)}
          />
        </div>
      )}
      {type === "forgot password" && !isConfirmed && (
        <div className="form">
          <p className="forgot_password">Forgot password?</p>
          <Input
            type="email"
            state={state.inputStates.emailState}
            placeholder="Your email"
            registerType={register("email")}
            handleBlur={() => updateFieldStates("email")}
          />
          <Button
            text="Next"
            isValid={isValid}
            onClick={handleSubmit(submitData)}
          />
          <ModalWrapper
            isModalVisible={state.isModalVisible}
            onBackdropClick={toggleModal}
          />
        </div>
      )}
      {type === "forgot password" && isConfirmed && (
        <div className="form">
          <Input
            type="password"
            state={state.inputStates.passwordState}
            placeholder="New password"
            registerType={register("password")}
            handleBlur={() => updateFieldStates("password")}
          />
          <Input
            type="password"
            state={state.inputStates.repeatPasswordState}
            placeholder="Retry new password"
            registerType={register("repeatPassword")}
            handleBlur={() => updateFieldStates("repeatPassword")}
          />
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
