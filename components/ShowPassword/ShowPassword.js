import Image from "next/image";

export const ShowPassword = ({
  showPasswordHandler,
  showPassword,
  showConfirmPassword,
}) => {
  return (
    <button
      type='button'
      className='btnIcon btnIconShowPassword'
      onClick={showPasswordHandler}
    >
      <Image
        src={
          showPassword || showConfirmPassword
            ? "/images/hidePassword.png"
            : "/images/showPassword.png"
        }
        width='23px'
        height='23px'
      />
    </button>
  );
};
