type Props = React.SVGProps<SVGSVGElement>;
export const ErrorIcon = (props: Props) => {
  return (
    <svg
      {...props}
      width={props.width ?? '40'}
      height={props.height ?? '41'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 41"
      fill="none"
    >
      <rect x="3" y="3.5" width="34" height="34" rx="17" fill="#F9BFBC" />
      <rect x="3" y="3.5" width="34" height="34" rx="17" stroke="#FFE9E8" stroke-width="6" />
      <path
        d="M25.3335 14.5H14.6668C13.9315 14.5 13.3335 15.098 13.3335 15.8333V25.1667C13.3335 25.902 13.9315 26.5 14.6668 26.5H25.3335C26.0688 26.5 26.6668 25.902 26.6668 25.1667V15.8333C26.6668 15.098 26.0688 14.5 25.3335 14.5ZM14.6668 25.1667V17.1667H25.3335L25.3342 25.1667H14.6668Z"
        fill="#B5251A"
      />
      <path
        d="M22.4715 19.638L21.5288 18.6953L20.0001 20.224L18.4715 18.6953L17.5288 19.638L19.0575 21.1666L17.5288 22.6953L18.4715 23.638L20.0001 22.1093L21.5288 23.638L22.4715 22.6953L20.9428 21.1666L22.4715 19.638Z"
        fill="#B5251A"
      />
    </svg>
  );
};
