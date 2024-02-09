interface FormMessageProps {
  error: string;
  success: string;
}
const FormMessage = ({ error, success }: FormMessageProps) => {
  return (
    <div>
      {error}, {success}
    </div>
  );
};

export default FormMessage;
