import React, { useEffect, useState } from "react";

import Loading from "./pages/Loading";
import App from "./App";

import astroAboutMe from './assets/astro_about_me.png';
import astroContactMe from './assets/astro_contact_me.png';
import astroHelp from './assets/astro_help.png';
import astroNotFound from './assets/astro_not_found.png';
import enveloppeContactMe from './assets/enveloppe_contact_me.png';
import profilePicture from './assets/profile_picture.png';
import dp from './assets/experiences/dp.png';
import groupeAtlantic from './assets/experiences/groupe-atlantic.png';
import pepite from './assets/experiences/pepite.png';
import corsica from './assets/projects/corsica.jpg';
import croixRouge from './assets/projects/croixrouge.jpg';
import gemu from './assets/projects/gemu.jpg';
import hobbies from './assets/projects/hobbies.jpg';
import madewis from './assets/projects/madewis.jpg';
import myYoukounkoun from './assets/projects/myyoukounkoun.jpg';
import portfolio from './assets/projects/portfolio.jpg';
import botDiscord from './assets/projects/botdiscord.jpg';
import smv from './assets/projects/smv.jpg';
import asm from './assets/projects/asm.jpg';
import bitbucket from './assets/skills/bitbucket.png';
import c from './assets/skills/c.png';
import firebase from './assets/skills/firebase.png';
import flutter from './assets/skills/flutter.png';
import github from './assets/skills/github.png';
import mysql from './assets/skills/mysql.png';
import nodejs from './assets/skills/nodejs.png';
import postman from './assets/skills/postman.png';
import python from './assets/skills/python.png';
import react from './assets/skills/react.png';
import redux from './assets/skills/redux.png';
import sequelize from './assets/skills/sequelize.png';
import sourcetree from './assets/skills/sourcetree.png';
import threejs from './assets/skills/threejs.png';
import kotlin from './assets/skills/kotlin.png';

const PreloadApp = () => {

    const [loadedApp, setLoadedApp] = useState(JSON.parse(sessionStorage.getItem('isSessionActive')));

    const preloadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = (event) => {
                reject(new Error(`Failed to load image with source: ${src}`));
            };
        });
    }

    useEffect(() => {
        const preloadImagesApp = () => {
            Promise.all([
                preloadImage(astroAboutMe),
                preloadImage(astroContactMe),
                preloadImage(astroHelp),
                preloadImage(astroNotFound),
                preloadImage(enveloppeContactMe),
                preloadImage(profilePicture),
                preloadImage(dp),
                preloadImage(groupeAtlantic),
                preloadImage(pepite),
                preloadImage(corsica),
                preloadImage(croixRouge),
                preloadImage(gemu),
                preloadImage(hobbies),
                preloadImage(madewis),
                preloadImage(myYoukounkoun),
                preloadImage(portfolio),
                preloadImage(botDiscord),
                preloadImage(smv),
                preloadImage(bitbucket),
                preloadImage(c),
                preloadImage(firebase),
                preloadImage(flutter),
                preloadImage(github),
                preloadImage(mysql),
                preloadImage(nodejs),
                preloadImage(postman),
                preloadImage(python),
                preloadImage(react),
                preloadImage(redux),
                preloadImage(sequelize),
                preloadImage(sourcetree),
                preloadImage(threejs),
                preloadImage(kotlin),
                preloadImage(asm)
            ]).then(() => {
                setTimeout(() => {
                    sessionStorage.setItem('isSessionActive', JSON.stringify(true));
                    setLoadedApp(true);
                }, 1000);
            })
                .catch((error) => {
                    console.error('Error preloading images:', error.message);
                    setTimeout(() => {
                        sessionStorage.setItem('isSessionActive', JSON.stringify(true));
                        setLoadedApp(true);
                    }, 1000);
                });
        }

        preloadImagesApp();

    }, []);

    return (
        <>
            {
                !loadedApp ? <Loading /> : <App />
            }
        </>
    );
}

export default PreloadApp;