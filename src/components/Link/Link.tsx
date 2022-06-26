import Xarrow from "react-xarrows";

type LinkProps = {
  start: string;
  end: string;
};

const Link = (linkProps: LinkProps) => {
  return (
    <Xarrow
      start={linkProps.start}
      end={linkProps.end}
      startAnchor="bottom"
      endAnchor={"top"}
      path={"grid"}
      showHead={false}
      color="#DCDCDC"
      strokeWidth={1}
    />
  );
};

export default Link;
