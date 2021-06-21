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
      {showPassword ? (
        <Image
          src={
            showPassword
              ? "/images/hidePassword.png"
              : "/images/showPassword.png"
          }
          width='23px'
          height='23px'
        />
      ) : (
        <Image
          src={
            showConfirmPassword
              ? "/images/hidePassword.png"
              : "/images/showPassword.png"
          }
          width='23px'
          height='23px'
        />
      )}
    </button>
  );
};
