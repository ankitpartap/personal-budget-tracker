import React, { useState } from 'react'
import "./style.css"
import InputComponent from '../Input'
import Button from '../Button'; import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';


function SignupSignin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function signupWithEmail() {
        setLoading(true)
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirmPassword);

        // authenticate
        if (name != "" && email != "" && password != "" && confirmPassword != "") {
            if (password == confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log("User>>>", user);
                        toast.success("User Created!!!")
                        setLoading(false);
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        createDoc(user);
                        //create a document with user id as the following id
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoading(false);

                        // ..
                    });
            }else{
                toast.error("Password & Confirm Password Mismatch")
            }
        }
        else {
            toast.error("All fields are mandatory");
            setLoading(false);
        }
    }

    function createDoc(){
        // make sure that the doc with the uid doesn't exit
        // create doc
    }

    return (
        <div className='signup-wrapper'>
            <h2 className='title'>
                Sign Up on <span style={{ color: "var(--theme)" }}>Budget Tracker</span>
            </h2>
            <form>
                <InputComponent inputType="text" label={"Full Name"} state={name} setState={setName} placeholder={""} />
                <InputComponent inputType="email" label={"Email"} state={email} setState={setEmail} placeholder={""} />
                <InputComponent inputType="password" label={"Password"} state={password} setState={setPassword} placeholder={""} />
                <InputComponent inputType="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={""} />
                <Button text={loading?"Loading...":"SignUp with Email and Password"} onBtnCLick={signupWithEmail} btnDisabled={loading}/>
                <p style={{ textAlign: "center", margin: 0 }}>Or</p>
                <Button text={loading?"Loading...":"SignUp using Google"} blue={true}/>
            </form>
        </div>
    )
}

export default SignupSignin