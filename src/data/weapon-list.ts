interface IWeaponList {
  firstRow: string[];
  secondRow: string[];
  [key: string]: string[];
}

const primaryWeapon: Readonly<IWeaponList> = {
  firstRow: ["React", "NodeJS", "Git", "Figma"],
  secondRow: ["MongoDB", "MySQL", "Ubuntu Server"],
};

const secondaryWeapon: Readonly<IWeaponList> = {
  firstRow: ["Laravel", "Docker", "CodeIginiter"],
  secondRow: ["Java", "Python"],
};

export { primaryWeapon, secondaryWeapon };
