export const FormComponent = () => {
  return (
    <>
      <h1 className="text-indigo-200 text-center mb-10 text-lg font-black">
        Add your {''}
        <span className="text-orange-600">Patients</span>
      </h1>

      <form>
        <label>Pet's Name</label>
        <input
          id="pet"
          type="text"
          name="name"
          className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
        />
      </form>
    </>
  );
};
