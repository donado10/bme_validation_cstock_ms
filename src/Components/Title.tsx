const Title: React.FC<{ name: string }> = ({ name }) => {
  return <h1 className="text-4xl font-semibold text-bme-700">{name}</h1>;
};

export default Title;
