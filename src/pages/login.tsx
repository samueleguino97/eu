import Button from '@/components/general/Button';
import useFormState from '@/hooks/useFormState';
import supabase from '@/services/supabase';

export type LoginProps = {};

function Login({}: LoginProps) {
  const [loginForm, getFieldProps] = useFormState();

  async function handleLogin(e) {
    e.preventDefault();

    await supabase.auth.signIn(
      { email: loginForm.email },
      { redirectTo: '/admin' },
    );
  }
  return (
    <div>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center ',
        }}
      >
        <input {...getFieldProps('email')} />
        <Button>Iniciar Sesion</Button>
      </form>
    </div>
  );
}

export default Login;
