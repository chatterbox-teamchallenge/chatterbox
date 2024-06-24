import Form from "../../components/Form/Form";
import logo from "../../img/logo.svg";

interface LoginProps {
  type: string;
  isConfirmed?: boolean;
}

const Login = ({type, isConfirmed}: LoginProps) => {
  return (
    <div className="register container">
      <img className="register__logo" src={logo} alt="logo" />
      {type === 'register' && <Form type={type} isConfirmed={isConfirmed} />  }
      {type === 'login' && <Form type={type}/>}
      {type === 'forgot password' && <Form type={type} isConfirmed={false}/>}
    </div>
  );
};

export default Login;