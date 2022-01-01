import React from "react";
import styles from "~/styles/Home.module.scss";
import { Sosmed } from "~/components/atomic";

const HomeContact = () => {
  return (
    <div id="home-contact">
      <h2 className={styles.headings2}>Get In Touch With Me</h2>
      <div style={{ maxWidth: "600px" }}>
        <p className="text-body">
          I&apos;m very happy to share knowledge. If you want to ask something about IT, productivity, or my college
          experience, feel free to discuss via <b>Instagram</b>.
        </p>
        <p className="text-body">
          For <b>hiring, business, or collaboration</b> please contact me via <b>email (fyfirman@gmail.com)</b> or{" "}
          <b>Linkedin</b>.
        </p>
      </div>
      <div className={styles.sosmed} id="contact-section">
        <Sosmed href="https://instagram.com/fyfirman" name="Instagram" position="left" />
        <Sosmed href="https://github.com/fyfirman" name="Github" position="left" />
        <Sosmed href="mailto:fyfirman@gmail.com" isMiddle name="Email" position="top" />
        <Sosmed href="https://www.linkedin.com/in/fyfirman/" isMiddle name="LinkedIn" position="bottom" />
        <Sosmed href="https://www.youtube.com/channel/UC2KC2T2XtzkG-IQs3MItv5Q" name="Youtube" position="right" />
        <Sosmed href="https://fyfirman.medium.com" name="Medium" position="right" />
      </div>
    </div>
  );
};

export default React.memo(HomeContact);
