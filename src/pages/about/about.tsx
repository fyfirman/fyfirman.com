/* @ts-expect-error ignore */
import Self from "@assets/images/self.jpg";
import { Head } from "@components/template";
import { useMediaQuery } from "react-responsive";
import styles from "~/styles/Home.module.scss";

const About = () => {
  const movePhoto = useMediaQuery({ query: "(max-width: 820px)" });

  return (
    <div className={styles.container}>
      <Head title="Home" />

      <main className={styles.main}>
        {/* About section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={styles.aboutMe}>
            <h1 className={styles.headings}>Firmansyah Yanuar</h1>
            <p className="text-body">
              I entered computer world starting from my mother&apos;s orders to type a document when I was in elementary
              school. From there I wondered what the computer could do. The first thing I did was create a graphic
              design to sell game jockey services on Facebook. I found my designs very beautiful, then I called myself
              as the youngest great graphic designer at the age of 12. Really childish Haha.
            </p>
            <p className="text-body">
              Several years later, I was introduced to programming. I feel challenged because programming is like
              solving a puzzle. So, I decided to get serious in this world, because I believe that the future really
              needs programming. I really happy to build apps/website that many people can use and writting{" "}
              <b>clean code</b> so that it is easy for others to understand.
            </p>
          </div>

          {!movePhoto && (
            <div className={styles.photoProfile}>
              <img alt="Firmansyah Yanuar" src={Self} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default About;
