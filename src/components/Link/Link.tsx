import Xarrow from "react-xarrows";

type LinkProps = {
  parentNodeId: string;
  childNodeId: string;
};

const Link = (linkProps: LinkProps) => {
  return (
    <Xarrow
      start={linkProps.parentNodeId}
      end={linkProps.childNodeId}
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
