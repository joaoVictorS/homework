interface FormProps {
  title: string;
  fields: { label: string; type: string; stateSetter: (value: any) => void }[];
  onSubmit: () => void;
}

const Form = ({ title, fields, onSubmit }: FormProps) => (
  <div className="mt-4">
    <h2 className="text-lg font-bold">{title}</h2>
    {fields.map((field, index) => (
      <label key={index}>
        {field.label}:
        <input
          type={field.type}
          onChange={(e) => field.stateSetter(e.target.value)}
          className="border p-2 rounded ml-2 w-full text-white"
        />
      </label>
    ))}
    <button
      className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded mt-2"
      onClick={onSubmit}
    >
      Confirmar
    </button>
  </div>
);

export default Form;
