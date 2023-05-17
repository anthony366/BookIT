import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";
import { useRouter } from "next/router";
import styles from "../styles/Form.module.scss";

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    console.log(status);

    if (status.ok) router.push(status.url);
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={formik.handleSubmit}>
            <h1 className="mb-4">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                name="email"
                id="email_field"
                className={
                  formik.touched.email && formik.errors.email
                    ? styles.error_border
                    : "form-control"
                }
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className={styles.error_warning}>{formik.errors.email}</p>
              ) : (
                <></>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                name="password"
                id="password_field"
                className={
                  formik.touched.password && formik.errors.password
                    ? styles.error_border
                    : "form-control"
                }
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className={styles.error_warning}>{formik.errors.password}</p>
              ) : (
                <></>
              )}
            </div>

            <a href="#" className="float-right mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link href="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
