type Props = React.SVGProps<SVGSVGElement>;

export const NotificationSucessIcon = (props: Props) => {
  return (
    <svg
      {...props}
      width="48"
      height="49"
      viewBox="0 0 48 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4.5" width="40" height="40" rx="20" fill="#D1FADF" />
      <rect
        x="4"
        y="4.5"
        width="40"
        height="40"
        rx="20"
        stroke="#ECFDF3"
        strokeWidth="8"
      />
      <path
        d="M34 24.08V25C33.9988 27.1564 33.3005 29.2547 32.0093 30.9818C30.7182 32.709 28.9033 33.9725 26.8354 34.5839C24.7674 35.1953 22.5573 35.1219 20.5345 34.3746C18.5117 33.6273 16.7847 32.2461 15.611 30.4371C14.4373 28.628 13.8798 26.4881 14.0217 24.3363C14.1636 22.1846 14.9972 20.1363 16.3983 18.4971C17.7994 16.8578 19.6928 15.7154 21.7962 15.2401C23.8996 14.7649 26.1003 14.9823 28.07 15.86M34 17L24 27.01L21 24.01"
        stroke="#039855"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
