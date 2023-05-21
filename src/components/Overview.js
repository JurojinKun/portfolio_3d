import AppTypewriter from "./AppTypewriter";
import '../css/index.css';

const Overview = () => {
    return (
        <section className="overview-content">
            <h1>
                Hi, I'm <span className="name">0ruj</span> <span className="wave">👋🏻</span>
            </h1>
            <p>
                I am a 26 years old french engineer who started his career in the world of AI, image processing and computer vision. 👨‍🎓🇨🇵
            </p>
            <p>Since 2 years and a half, I am a self-taught frontend developer in the vast world of mobile and web development. 📱</p>
            <p>Why not learn the backend to become a full stack developer soon? 🧠</p>
            <AppTypewriter
                strings={[
                    "Young developper in the IT world",
                    "Always learning new things",
                ]}
                wrapperClassName="typewriterWrapper"
                cursorClassName="typewriterCursor"
            />
        </section>
    );
}

export default Overview;