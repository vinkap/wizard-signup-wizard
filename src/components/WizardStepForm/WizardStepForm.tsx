import React, { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import './WizardStepForm.css'

import { User, Wizard } from '../../models/interfaces';
import { WIZARD_SCHOOLS } from '../../models/constants';
import { Alignment } from '../../models/enums';

type Prop = {
  userData: User | undefined;
  onPrevious: (user: User) => void;
  onComplete: (user: User) => void;
  submitBtn: (disabled: boolean) => ReactNode;
}

export default function WizardStepForm({ userData, onPrevious, submitBtn, onComplete }: Prop) {
  const { register, handleSubmit, setFocus, formState: { errors, isSubmitting } } = useForm<Wizard>();

  useEffect(() => {
    setFocus("name");
  }, [])

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors])

  const onSubmit = handleSubmit((data) => new Promise<void>(resolve => setTimeout(() => {
    // console.dir(data);
    onComplete({ ...userData!, wizard: { ...data } });
    resolve();
  }, 2000)));

  return (
    <>
      <form className='form' onSubmit={onSubmit}>
        <h3>Your Wizard</h3>
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
          <label htmlFor="level">Level</label>
          <input type="number" id="level" step={1}
            {...register("level", {
              valueAsNumber: true,
              required: "Please provide a level",
              min: { value: 1, message: 'Level cannot be less than 1' },
              max: { value: 20, message: 'Level cannot me more than 20' },
              validate: (value) => Number.isInteger(value) || 'Level must be a whole number.',
            })}
          />
          {errors?.level &&
            <span role="alert" className="field-errors">{errors?.level?.message}</span>}
        </p>
        <p>
          <label htmlFor="school">School</label>
          <select id="school"
            {...register("school",
              {
                validate: (value) => (value !== '') || 'Please select a school.',
              }
            )}
          >
            <option defaultValue={-1}>-- Select One --</option>
            {WIZARD_SCHOOLS.map(school => <option value={school}>{school}</option>)}
          </select>
          {errors?.school &&
            <span role="alert" className="field-errors">{errors?.school?.message}</span>}
        </p>
        <p>
          <label htmlFor="alignment">Alignment</label>
          {Object.entries(Alignment).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                value={value}
                key={key}
                {...register('alignment', { required: 'Please select an Alignment' })}
              />
              {value}
            </label>
          ))}
          {errors?.alignment &&
            <span role="alert" className="field-errors">{errors?.alignment?.message}</span>}
        </p>
        {/* <button onClick={() => onPrevious(userData!)}>Prev</button> */}
        {submitBtn(isSubmitting)}
      </form>
      <br />
    </>
  )
}
