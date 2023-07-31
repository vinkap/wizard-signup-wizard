import React, { ReactNode, useEffect, useState } from 'react'
import './SignupFlow.css';

import UserStepForm from '../UserStepForm/UserStepForm';
import WizardStepForm from '../WizardStepForm/WizardStepForm';
import SidekickStepForm from '../SidekickStepForm/SidekickStepForm';
import ConfirmationStep from '../ConfirmationStep/ConfirmationStep';

import { User } from '../../models/interfaces';

export default function SignupFlow() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [userData, setUserData] = useState<User | undefined>()

    const getStepForm = () => {
        switch (currentStep) {
            case 0: return <UserStepForm submitBtn={submitBtn} onComplete={onComplete} userData={userData} />;
            case 1: return <WizardStepForm submitBtn={submitBtn} onPrevious={onPrevious} onComplete={onComplete} userData={userData} />;
            case 2: return <SidekickStepForm submitBtn={submitBtn} onPrevious={onPrevious} onComplete={onComplete} userData={userData} />;
            case 3: return <ConfirmationStep submitBtn={submitBtn} onPrevious={onPrevious} onComplete={onComplete} userData={userData!} />;
            default:
                setCurrentStep(0);
        }
    };

    const submitBtn = (disabled: boolean, label: string = 'Next') => <button type='submit' disabled={disabled}>{disabled ? "Saving..." : label}</button>;

    const onComplete = (data: User, done?: boolean) => {
        if (!!done) {
            setUserData(undefined); // Clear current data
            setCurrentStep(0); // Reset the flow
        } else {
            // console.dir(data);
            setUserData((prev) => ({ ...prev, ...data }))
            setCurrentStep((prev) => prev + 1)
        }
    }

    const onPrevious = (data: User) => {
        setUserData(data);
        setCurrentStep((prev) => prev - 1);
    }

    useEffect(() => {
      console.dir(userData);
    }, [userData]);

    return (
        <div>
            <h2 className='title'>Wizard Signup Wizard</h2>
            <div className="steps">
                {getStepForm()}
            </div>
        </div>
    )
}
