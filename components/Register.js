import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { register_validate } from "@/lib/validate";
import styles from "../styles/Form.module.scss";

const Register = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/auth/register", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/login");
        }
      });
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={formik.handleSubmit}>
            <h1 className="mb-4">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                name="name"
                id="name_field"
                className={
                  formik.touched.name && formik.errors.name
                    ? styles.error_border
                    : "form-control"
                }
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className={styles.error_warning}>{formik.errors.name}</p>
              ) : (
                <></>
              )}
            </div>

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

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
