import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Weapon, Sosmed, ProjectCard } from "../components/atomic";
import pacisBot from "@assets/images/project/pacis-bot.jpg";
import himatifApps from "@assets/images/project/himatif-apps.jpg";
import careIn from "@assets/images/project/carein.jpg";
import terimaCurhatASI from "@assets/images/project/terima-curhat-asi.jpg";
import Self from "@assets/images/self.jpg";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  console.log("halo, mau cari apa bos?");

  const movePhoto = useMediaQuery({ query: "(max-width: 820px)" });
  const render3D = useMediaQuery({
    query: "(min-device-width: 1080px)",
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Firmansyah Yanuar</title>
        <meta name="description" content="Personal websites of Firmansyah Yanuar (Student, Developer, Designer)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* About section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.aboutMe}>
            <h1 className={styles.headings}>Hi, i’m firmansyah!</h1>
            <h2 className={styles.title}>student | developer | designer</h2>
            <p className={styles.body}>
              I entered computer world starting from my mother&apos;s orders to type a document when
              I was in elementary school. From there I wondered what the computer could do. The
              first thing I did was create a graphic design to sell game jockey services on
              Facebook. I found my designs very beautiful, then I called myself as the youngest
              great graphic designer at the age of 12. Really childish Haha.
            </p>
            <p className={styles.body}>
              Several years later, I was introduced to programming. I feel challenged because
              programming is like solving a puzzle. So, I decided to get serious in this world,
              because I believe that the future really needs programming. I really happy to build
              apps/website that many people can use and writting <b>clean code</b> so that it is
              easy for others to understand.
            </p>
            <p className={styles.body}>
              Now I am a final year student at Padjadjaran University and am{" "}
              <span className={styles.highlight}>looking for a job (fulltime/intern)</span> at a
              company that has strong technological qualities so that I can learn a lot from that
              company.
            </p>
          </div>

          {!movePhoto && (
            <div className={styles.photoProfile}>
              <Image src={Self} alt="Firmansyah Yanuar Photo" />
            </div>
          )}
        </div>

        {render3D && (
          <div className="spline-container">
            <iframe
              title="3d-spline-geo-1"
              id="spline-geo-1"
              src="spline/geometric-1/index.html"
              frameBorder="0"
              allowtransparency="true"
            />
          </div>
        )}

        {/* Weapon section */}
        <h2 className={styles.headings2}>My Weapons</h2>
        <div className={styles.weaponContainer}>
          <div style={{ flex: 1 }}>
            <h3 className={styles.weaponType}>Primary</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Weapon name="React" />
              <Weapon name="NodeJS" />
              <Weapon name="Git" />
              <Weapon name="Figma" />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Weapon name="MongoDB" />
              <Weapon name="MySQL" />
              <Weapon name="Ubuntu Server" />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h3 className={styles.weaponType}>Secondary</h3>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Weapon name="Laravel" />
                <Weapon name="Docker" />
                <Weapon name="CodeIginiter" />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Weapon name="Java" />
                <Weapon name="Python" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Section */}
        <h2 className={styles.headings2} id="project-section">
          Selected Project
        </h2>
        <div className={`${styles.projectContainer} ${styles.first}`}>
          <ProjectCard
            title="Pacis-bot"
            desc="Auto-fill questionnare on PACIS Unpad"
            stack={["NodeJS"]}
            imageURI={pacisBot}
            href="https://github.com/fyfirman/pacis-questionnaire-bot"
          />
          <ProjectCard
            title="Himatif Apps"
            desc="Information system for the ‘Himatif FMIPA Unpad’ members"
            stack={["Laravel", "MySQL"]}
            imageURI={himatifApps}
            href="https://apps.himatif.org/"
          />
        </div>
        <div className={`${styles.projectContainer} ${styles.last}`}>
          <ProjectCard
            title="Care.in"
            desc="Health services in person by ordering via application"
            stack={["React Native", "NodeJS", "MySQL"]}
            imageURI={careIn}
            href="https://play.google.com/store/apps/details?id=com.carein"
          />
          <ProjectCard
            title="Terima Curhat ASI"
            desc="Application to retrieve an consultation about exclusive breast feeding"
            stack={["React Native", "Laravel", "MySQL"]}
            imageURI={terimaCurhatASI}
            href="#"
            notAvailable
          />
        </div>
        {/* <Link to="/project/">See All Project</Link> <br /> */}

        {render3D && (
          <div className="spline-container">
            <iframe
              title="3d-spline-geo-2"
              id="spline-geo-2"
              src="spline/geometric-2/index.html"
              frameBorder="0"
              allowtransparency="true"
            />
          </div>
        )}

        {/* Contact Section */}
        <h2 className={styles.headings2}>Get In Touch With Me</h2>
        <div style={{ maxWidth: "600px" }}>
          <p className={styles.body}>
            I'm very happy to share knowledge. If you want to ask something about IT, productivity,
            or my college experience, feel free to discuss via <b>Instagram</b>.
          </p>
          <p className={styles.body}>
            For <b>hiring, business, or collaboration</b> please contact me via{" "}
            <b>email (fyfirman@gmail.com)</b> or <b>Linkedin</b>.
          </p>
        </div>
        <div id="contact-section" className={styles.sosmed}>
          <Sosmed name="Instagram" href="https://instagram.com/fyfirman" position="left" />
          <Sosmed name="Github" href="https://github.com/fyfirman" position="left" />
          <Sosmed name="Email" href="mailto:fyfirman@gmail.com" position="top" isMiddle />
          <Sosmed
            name="LinkedIn"
            href="https://www.linkedin.com/in/fyfirman/"
            position="bottom"
            isMiddle
          />
          <Sosmed
            name="Youtube"
            href="https://www.youtube.com/channel/UC2KC2T2XtzkG-IQs3MItv5Q"
            position="right"
          />
          <Sosmed name="Medium" href="https://fyfirman.medium.com" position="right" />
        </div>
      </main>
    </div>
  );
};

export default Home;
