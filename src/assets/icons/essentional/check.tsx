type Props = React.SVGProps<SVGSVGElement>;
export const CheckIcon = (props: Props) => {
  return (
    <svg
      {...props}
      width={props.width ?? '24'}
      height={props.height ?? '18'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 18"
      fill="none"
    >
      <path
        d="M8.59029 18C8.11005 18 7.65383 17.7991 7.31766 17.4475L0.522261 10.3404C-0.174087 9.61214 -0.174087 8.4067 0.522261 7.67841C1.21861 6.95012 2.37119 6.95012 3.06753 7.67841L8.59029 13.4545L20.9325 0.546216C21.6288 -0.182072 22.7814 -0.182072 23.4777 0.546216C24.1741 1.2745 24.1741 2.47994 23.4777 3.20823L9.86293 17.4475C9.52676 17.7991 9.07053 18 8.59029 18Z"
        fill="#4D4D4D"
      />
    </svg>
  );
};
