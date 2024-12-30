import React, { useState } from 'react'
import "./style.css"
import InputComponent from '../Input'
import Button from '../Button';

function SignupSignin() {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    return (
        <div className='signup-wrapper'>
            <h2 className='title'>
                Sign Up on <span style={{color:"var(--theme)"}}>Budget Tracker</span>
            </h2>
            <form>
                <InputComponent label={"Full Name"} state={name} setState={setName} placeholder={""}/>
                <InputComponent label={"Email"} state={email} setState={setEmail} placeholder={""}/>
                <InputComponent label={"Password"} state={password} setState={setPassword} placeholder={""}/>
                <InputComponent label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={""}/>
                <Button text={"SignUp with Email and Password"}/>
                <p style={{textAlign:"center", margin:0}}>Or</p>
                <Button text={"SignUp using Google"} blue={true}/>
            </form>
        </div>
    )
}

export default SignupSignin