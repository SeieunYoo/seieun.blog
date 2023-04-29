interface Props {
  title: string;
  description: string;
}

export const PreviewItem = ({ title, description }: Props) => {
  return (
    <>
      <div>{title}</div>
      <div>{description}</div>
    </>
  );
};
