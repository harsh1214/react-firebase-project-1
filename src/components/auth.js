import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            console.log(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }
        catch(err){
            console.log(err);
        }
    };
    
    const logOut = async () => {
        try{
            await signOut(auth);
        }
        catch(err){
            console.log(err);
        }
    };

    return (
        <div className="input-container">
            <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Google</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}