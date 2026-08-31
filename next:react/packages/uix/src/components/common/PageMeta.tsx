type Pagedata = {
  title: string;
};
const PageMeta = ({ title }: Pagedata) => {
  return (
    <title>
      {title
        ? `${title} | bponix Soft - The Software Solutions`
        : ' bponix Soft - The Software Solutions'}
    </title>
  );
};

export default PageMeta;
