import React, { ReactNode } from 'react'
import { useForm } from 'react-hook-form';
import './ConfirmationStep.css'
import { User } from '../../models/interfaces';

type Props = {
  userData: User;
  onPrevious: (user: User) => void;
  onComplete: (user: User, done: boolean) => void;
  submitBtn: (disabled: boolean, label: string) => ReactNode;
}

export default function ConfirmationStep({ userData, onPrevious, submitBtn, onComplete }: Props) {
  const { handleSubmit, 
          formState: { isSubmitting } 
        } = useForm<User>();

  const onSubmit = handleSubmit((data) => new Promise<void>(resolve => setTimeout(() => {
    // console.dir(data);
    onComplete({ ...userData }, true);
    resolve();
  }, 2000)));

  return (
    <>
      <form className='form' onSubmit={onSubmit}>
        <h3>Confirm your Registration</h3>
        <h4>User Details</h4>
        <p>Email: {userData?.email}</p>
        <p>Receive Newsletter: {userData?.newsletter ? "Yes" : "No"}</p>

        <h4>Wizard</h4>
        <p>Name: {userData?.wizard?.name}</p>
        <p>Level: {userData?.wizard?.level}</p>
        <p>School: {userData?.wizard?.school}</p>
        <p>Alignment: {userData?.wizard?.alignment}</p>

        <h4>Sidekick</h4>
        <p>Name: {userData?.sidekick?.name}</p>
        <p>Skill: {userData?.sidekick?.skill}</p>

        <button onClick={() => onPrevious(userData!)}>Prev</button>
        {submitBtn(isSubmitting, 'Confirm and Sign up!')}
      </form>
      <br />
    </>
  )
}
