import ContentLoader from "react-content-loader";
// loader au chargement de la page

const BookLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1000}
    height={550}
    viewBox="0 0 1000 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="10" y="10" rx="10" ry="10" width="200" height="200" />
    <rect x="230" y="10" rx="10" ry="10" width="200" height="200" />
    <rect x="450" y="10" rx="10" ry="10" width="200" height="200" />
    <rect x="670" y="10" rx="10" ry="10" width="200" height="200" />
    <rect x="890" y="10" rx="10" ry="10" width="200" height="200" />

    <rect x="10" y="230" rx="10" ry="10" width="200" height="200" />
    <rect x="230" y="230" rx="10" ry="10" width="200" height="200" />
    <rect x="450" y="230" rx="10" ry="10" width="200" height="200" />
    <rect x="670" y="230" rx="10" ry="10" width="200" height="200" />
    <rect x="890" y="230" rx="10" ry="10" width="200" height="200" />
  </ContentLoader>
);

export default BookLoader;
