import React, { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './UserStepForm.css'
import { User } from '../../models/interfaces';

type Prop = {
  onComplete: (user: User) => void;
  submitBtn: (disabled: boolean, label: string) => ReactNode;
}

export default function UserStepForm({ submitBtn, onComplete }: Prop) {
  const { register, handleSubmit, getValues, setFocus, formState: { errors, isSubmitting } } = useForm<User>();

  useEffect(() => {
    setFocus("email");
  }, [])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])

  const onSubmit = handleSubmit((data) => new Promise<void>(resolve => setTimeout(() => {
    // console.dir(data);
    onComplete(data);
    resolve();
  }, 2000)));

  return (
    <>
      <form className='form' onSubmit={onSubmit}>
        <h3>User Information</h3>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email"
            id="email"
            placeholder="name@example.com"
            aria-invalid={errors?.email ? "true" : "false"}
            {...register("email",
              {
                required: "Please provide an email.",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: 'Please provide a valid email address'
                }
              }
            )}
          />
          {errors?.email &&
            <span role="alert" className="field-errors">{errors?.email?.message}</span>}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password"
            {...register("password",
              {
                required: "Please provide a password.",
                minLength: { value: 8, message: `Username must be at least 8 characters.` },
                maxLength: { value: 50, message: "Username must be max 50 characters." },
              }
            )}
          />
          {errors?.password &&
            <span role="alert" className="field-errors">{errors?.password?.message}</span>}
        </p>
        <p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword"
            {...register("confirmPassword",
              {
                required: "Please type your password again here to confirm.",
                validate: (val: string) => {
                  if (getValues("password") !== val) {
                    return "Your passwords do not match."
                  }
                }

              }
            )}
          />
          {errors?.confirmPassword &&
            <span role="alert" className="field-errors">{errors?.confirmPassword?.message}</span>}
        </p>
        <p>
          <label htmlFor="terms">Terms</label>
          <input type="checkbox" id="terms"
            {...register("terms",
              {
                required: "Please accept terms to continue",
              }
            )}
          /> I accept the terms and conditions
          {errors?.terms &&
            <span role="alert" className="field-errors">{errors?.terms?.message}</span>}
        </p>
        <p>
          <label htmlFor="terms">Newsletter</label>
          <input type="checkbox" id="newsletter" {...register("newsletter")} /> I would like to receive email udates
        </p>
        {submitBtn(isSubmitting, 'Get Started')}
      </form>
      <br />
    </>
  )
}
