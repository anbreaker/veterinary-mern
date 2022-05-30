import { ListPatients } from '../components/ListPatients';
import { FormComponent } from '../components/FormComponent';

export const AdminPatients = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 lg:w-2/5">
          <FormComponent />
        </div>

        <div className="md:w-1/2 lg:w-3/5">
          <ListPatients />
        </div>
      </div>
    </>
  );
};
