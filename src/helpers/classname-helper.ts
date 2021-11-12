export const clsx = (classNameList: (string | undefined | false)[]) => {
  return classNameList.filter((val) => !!val).join(" ");
};
