import { type MouseEvent, useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { KeenIcon } from '@/components';
import { Alert } from '@/components';
import { useLayout } from '@/providers';
import { useAuthContext } from '@/auth';
const loginSchema = Yup.object().shape({
  Identifier: Yup.string()
    // .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email or Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  remember: Yup.boolean()
});

const initialValues = {
  Identifier: '',
  password: '',
  remember: false
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/tf_genie/discrepancy/dashboard';
  const [showPassword, setShowPassword] = useState(false);
  const { currentLayout } = useLayout();
  const { currentUser, auth, login } = useAuthContext(); 
  console.log(' Logged-in user from context:', currentUser);


  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setStatus('');

      try {
        const user = await login(values.Identifier, values.password);
        console.log("user",user)
        
        if (values.remember) {
          localStorage.setItem('identifier', values.Identifier);
        } else {
          localStorage.removeItem('identifier');
        }

        const savedPath = localStorage.getItem('lastPath');

        navigate(savedPath || '/tf_genie/discrepancy/dashboard', { replace: true });
        localStorage.removeItem('lastPath');
      } catch (err: any) {
        setStatus('incorrect username or password');
        setSubmitting(false);
      } finally {
        setLoading(false);
      }
    }
  });

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  if (auth) {
    return <Navigate to="/tf_genie/discrepancy/dashboard" replace />;
  }

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">Log in</h3>
        </div>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Email / Username</label>
          <label className="input">
            <input
              placeholder="Enter username"
              autoComplete="off"
              {...formik.getFieldProps('Identifier')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.Identifier && formik.errors.Identifier
              })}
            />
          </label>
          {formik.touched.Identifier && formik.errors.Identifier && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.Identifier}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Password</label>
          <label className="input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.password && formik.errors.password
              })}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
              <KeenIcon
                icon="eye-slash"
                className={clsx('text-gray-500', { hidden: !showPassword })}
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        <label className="checkbox-group">
          <input
            className="checkbox checkbox-sm"
            type="checkbox"
            {...formik.getFieldProps('remember')}
          />
          <span className="checkbox-label">Remember me</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary flex justify-center grow"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Please wait...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export { Login };
