import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const { signInRequest } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signInRequest(data);
  }
  return (
    <div>
      <h1>ERP</h1>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor='email'>Email</label>
        <input
          {...register("email")}
          type='email'
          name='email'
          id='email'
          autoComplete='email'
          required
          placeholder='Email...'
        />
        <label htmlFor='password'>Password</label>
        <input
          {...register("password")}
          type='password'
          name='password'
          id='password'
          autoComplete='current-password'
          required
          placeholder='Password...'
        />
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
}
