import { z } from "zod";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../requests/userRequests";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/userSlice";
import { REGEX } from "../../constants/regex";

interface IState {
  inputStates: any;
}

type FormData = {
  name?: string;
  password?: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    inputStates: {
      loginState: "default",
      passwordState: "default",
    },
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(1)
      .refine((value) => {
        const emailPattern = REGEX.email;
        const usernamePattern = REGEX.username;
        return emailPattern.test(value) || usernamePattern.test(value);
      }, "Enter a valid email or username"),
    password: z.string().min(6),
  });

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
    try {
        const res = await loginUser(data);
        const user = res?.data;
        dispatch(updateUser(user));
        navigate("/chat");
    }
    catch (error) {
        navigate("/login")
    }
  };

  const isFieldCorrect = async (
    fieldName: keyof FormData,
    fieldValue: string | undefined,
  ) => {
    await trigger(fieldName);
    if (isFieldFilled(fieldValue) && errors[fieldName] === undefined)
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

  return (
    <form className="form__wrapper" onSubmit={handleSubmit(submitData)}>
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
        <Link to="/forgot_password">
          <p className="forgot__password__link">Forgor password?</p>
        </Link>
        <Button
          text="Next"
          isValid={isValid}
          onClick={handleSubmit(submitData)}
        />
      </div>
    </form>
  );
}
