import type { NextPage } from 'next';
import ValidatorForm from '@/components/validatorForm';

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center mx-auto min-h-screen">
      <ValidatorForm />
    </div>
  );
};

export default Home;
