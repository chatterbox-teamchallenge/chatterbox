import Form from "../../components/Form/Form";
import logo from "../../img/logo.svg";

interface LoginProps {
  type: string;
}

const Login = ({type}: LoginProps) => {
  return (
    <div className="register container">
      <img className="register__logo" src={logo} alt="logo" />
      {type === 'register' && <Form type={type} isConfirmed={true} />  }
      {type === 'login' && <Form type={type}/>}
      {type === 'forgot password' && <Form type={type} isConfirmed={false}/>}
    </div>
  );
};

export default Login;