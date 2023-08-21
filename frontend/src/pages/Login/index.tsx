import LoginForm from "../../components/auth/Login";
import {Link} from 'react-router-dom';
export default function LoginPage() {
  return (
    <main className="pt-[4rem]">
      <div className="w-fit mx-auto">
        <h1 className="text-center text-4xl font-semibold mb-[1.5rem]">Login</h1>
        <LoginForm />
        <Link to={'/sign-up'} className="text-xl mt-[1rem] block w-fit mx-auto text-amber-400" >Don't have account? Create a new one</Link>
      </div>

    </main>
  );
}
