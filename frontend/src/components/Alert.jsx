export const Alert = ({ alert }) => {
  return (
    <>
      <div
        className={`${
          alert.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'
        } bg-gradient-to-r  text-center uppercase p-3 rounded-xl text-sm text-white font-bold mb-5`}
      >
        {alert.msg}
      </div>
    </>
  );
};
