import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}
const FormSuceess = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="w-full bg-emerald-100 px-4 py-2 flex items-center gap-x-2 text-emerald-500 font-medium rounded-md">
      <FaExclamationTriangle className="w-4 h-4" />
      {message}
    </div>
  );
};

export default FormSuceess;
