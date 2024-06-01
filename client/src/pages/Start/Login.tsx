import Form from "../../components/Form/Form";
import logo from "../../img/logo.svg";

interface LoginProps {
  type: string;
}

const Login = ({type}: LoginProps) => {
  return (
    <div className="register container">
      <img className="register__logo" src={logo} alt="logo" />
      {type === 'register' && <Form type="register" isConfirmed={true} />  }
      {type === 'login' && <Form type="login"/>}
    </div>
  );
};

export default Login;