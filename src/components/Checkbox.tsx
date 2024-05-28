import styles from "./Checkbox.module.scss";


type Props = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default function Checkbox({ value, onChange, children }: Props) {
  return (
    <div>
      <label className={styles.checkbox} >
        <input type="checkbox" onChange={onChange} value={value} />
        {children}
      </label>
    </div>
  );
}
