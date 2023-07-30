import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './SidekickStepForm.css'

import { Sidekick, User } from '../../models/interfaces';
import SubmitButton from '../SubmitButton/SubmitButton';


type Prop = {
  userData: User | undefined;
  onPrevious: (user: User) => void;
  onComplete: (user: User) => void;
}

export default function SidekickStepForm({ userData, onPrevious, onComplete }: Prop) {
  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting } } = useForm<Sidekick>();

  useEffect(() => {
    setFocus("name");
  }, [])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])

  const onSubmit = handleSubmit((data) => new Promise<void>(resolve => setTimeout(() => {
    // console.dir(data);
    onComplete({ ...userData!, sidekick: { ...data } });
    resolve();
  }, 2000)));

  return (
    <>
      <form className='form' onSubmit={onSubmit}>
        <h3>Your Sidekick</h3>
        <p>
          <label htmlFor="name">Name</label>
          <input type="text"
            id="name"
            {...register("name",
              {
                required: "Please provide a name.",
              }
            )}
          />
          {errors?.name &&
            <span role="alert" className="field-errors">{errors?.name?.message}</span>}
        </p>
        <p>
          <label htmlFor="name">Skill (Optional)</label>
          <input type="text"
            id="skill"
            {...register("skill"
            )}
          />
          {errors?.skill &&
            <span role="alert" className="field-errors">{errors?.skill?.message}</span>}
        </p>
        <button onClick={() => onPrevious(userData!)}>Prev</button>
        <SubmitButton disabled={isSubmitting}/>
      </form>
      <br />
    </>
  )
}
