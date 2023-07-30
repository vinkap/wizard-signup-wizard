import React from 'react'
import { useForm } from 'react-hook-form';
import './ConfirmationStep.css'
import { User } from '../../models/interfaces';
import SubmitButton from '../SubmitButton/SubmitButton';

type Props = {
  userData: User;
  onPrevious: (user: User) => void;
  onComplete: (user: User, done: boolean) => void;
}

export default function ConfirmationStep({ userData, onPrevious, onComplete }: Props) {
  const { handleSubmit, formState: { isSubmitting } } = useForm<User>();

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
        <SubmitButton label='Confirm and Sign up!' disabled={isSubmitting}/>
      </form>
      <br />
    </>
  )
}
