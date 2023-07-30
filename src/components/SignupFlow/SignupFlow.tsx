import React, { useEffect, useState } from 'react'
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
            case 0: return <UserStepForm onComplete={onComplete} />;
            case 1: return <WizardStepForm userData={userData} onPrevious={onPrevious} onComplete={onComplete} />;
            case 2: return <SidekickStepForm userData={userData} onPrevious={onPrevious} onComplete={onComplete} />;
            case 3: return <ConfirmationStep userData={userData!} onPrevious={onPrevious} onComplete={onComplete} />;
            default:
                setCurrentStep(0);
        }
    };

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
