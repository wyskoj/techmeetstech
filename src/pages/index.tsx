import Head from 'next/head'
import Image from 'next/image'
import {useDefaultAuthState} from '../utils/hooks/firebase';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import Router from 'next/router';
import {useEffect, useState} from "react";
import {setDoc, doc, getFirestore} from 'firebase/firestore'
import {useInterests} from "../utils/hooks/interests";
import Button from '@mui/material/Button';

export default function Home() {

    const {user, loading} = useDefaultAuthState();

    const [interest, setInterest] = useState("")

    useEffect(() => {
        if (user) {
            console.log("logged in!")
            console.log(loading);
        }
    }, [loading, user]);

    const {interests} = useInterests();

    return <>
        <main>
            <h1>Tech Meets Tech</h1>
            {user ? <p>
                {user.displayName}
                <Button variant={"contained"} onClick={() => {
                    signOut(getAuth());
                }}>
                    Sign out
                </Button>
                <input type={"text"} value={interest} onChange={(event) => {
                    setInterest(event.target.value)
                }}/>
                <Button onClick={() => {
                    setDoc(doc(getFirestore(), `/users/${user.uid}/interests/${interest}`), {
                        interest
                    });
                }}>Add interest
                </Button>
                {interests ? interests.map((interest) => <li key={null}>{interest.interest}</li>) : ""}
            </p> : <button onClick={async () => {
                try {
                    const provider = new GoogleAuthProvider();
                    provider.setCustomParameters({
                        hd: "mtu.edu"
                    });
                    const login = await signInWithPopup(getAuth(), provider);
                    console.log(login);
                } catch (error) {
                    console.error("Failed Google sign-in.", error);
                }
            }}>
                Sign in with Google
            </button>}
        </main>
    </>
}
