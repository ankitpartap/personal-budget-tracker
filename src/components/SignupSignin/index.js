import React, { use, useState } from 'react'
import "./style.css"
import InputComponent from '../Input'
import Button from '../Button'; import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import {doc, setDoc, getDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


function SignupSignin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(false);
    const navigate=useNavigate();

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
                        navigate("/dashboard")
                        //create a document with user id as the following id
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoading(false);

                        // ..
                    });
            } else {
                toast.error("Password & Confirm Password Mismatch")
            }
        }
        else {
            toast.error("All fields are mandatory");
            setLoading(false);
        }
    }

    function loginUsingEmail() {
        console.log("Email", email);
        console.log("Password", password);

        setLoading(true);

        if (email != "" && password != ""){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success("User Logged In!!!")
                console.log("User: ", user);
                setLoading(false);
                navigate("/dashboard")
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
            });
        }else{
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
 

    }

    async function createDoc(user) {
        setLoading(true);
        // make sure that the doc with the uid doesn't exit
        // create doc
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if(!userData.exists()){
            try{
                await setDoc(doc(db, "users", user.uid), {
                    name : user.displayName ? user.displayName : name, 
                    email : user.email,
                    photoURL : user.photoURL ? user.photoURL:"", 
                    createdAt: new Date(),
                });
                toast.success("Doc Created!");
                setLoading(false);
            }
            catch(e){
                toast.error(e.message);
                setLoading(false);
    
            }
        }else{
            toast.error("Doc already exits");
            setLoading(false);
        }
    }

    return (
        <>
            {loginForm ? <div className='signup-wrapper'>
                <h2 className='title'>
                    Login on <span style={{ color: "var(--theme)" }}>Budget Tracker</span>
                </h2>
                <form>

                    <InputComponent inputType="email" label={"Email"} state={email} setState={setEmail} placeholder={""} />
                    <InputComponent inputType="password" label={"Password"} state={password} setState={setPassword} placeholder={""} />
                    <Button text={loading ? "Loading..." : "Login with Email and Password"} onBtnCLick={loginUsingEmail} btnDisabled={loading} />
                    <p className='p-login'>Or</p>
                    <Button text={loading ? "Loading..." : "Login using Google"} blue={true} />
                    <p className='p-login' style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Don't have an account? Click Here!</p>
                </form>
            </div> : <div className='signup-wrapper'>
                <h2 className='title'>
                    Sign Up on <span style={{ color: "var(--theme)" }}>Budget Tracker</span>
                </h2>
                <form>
                    <InputComponent inputType="text" label={"Full Name"} state={name} setState={setName} placeholder={""} />
                    <InputComponent inputType="email" label={"Email"} state={email} setState={setEmail} placeholder={""} />
                    <InputComponent inputType="password" label={"Password"} state={password} setState={setPassword} placeholder={""} />
                    <InputComponent inputType="password" label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={""} />
                    <Button text={loading ? "Loading..." : "SignUp with Email and Password"} onBtnCLick={signupWithEmail} btnDisabled={loading} />
                    <p className='p-login'>Or</p>
                    <Button text={loading ? "Loading..." : "SignUp using Google"} blue={true} />
                    <p className='p-login' style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Have an account already? Click Here!</p>
                </form>
            </div>}

        </>
    )
}

export default SignupSignin