import styles from "./Title.module.scss";

type Props = {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return <>
    <h2 className={styles.title}>
      {children}
    </h2>
  </>;
}
