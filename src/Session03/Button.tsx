interface ButtonProps {
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <button onClick={onClick}>click me</button>
);
export default Button;