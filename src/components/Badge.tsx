import styles from "./Badge.module.scss";

type Props = {
  children: React.ReactNode
}

export default function Badge({ children }: Props) {
  return <>
    <h2 className={styles.badge}>
      {children}
    </h2>
  </>;
}
