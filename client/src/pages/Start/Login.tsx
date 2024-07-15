import LoginForm from "../../components/Form/LoginForm";
import RegisterForm from "../../components/Form/RegisterForm";
import logo from "../../img/logo.svg";

interface LoginProps {
  type: string;
  isConfirmed?: boolean;
}

const Login = ({type, isConfirmed}: LoginProps) => {
  return (
    <div className="register container">
      <img className="register__logo" src={logo} alt="logo" />
      {(type === 'register' || type === 'forgot password') && <RegisterForm type={type} isConfirmed={isConfirmed} />}
      {type === 'login' && <LoginForm />}
    </div>
  );
};

export default Login;