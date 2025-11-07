import classNames from "@/utils";

type SkeletonProps = {
  animation?: boolean;
  asElement?: React.ElementType;
  className?: string;
  height?: string | number;
  ref?: React.Ref<any>;
  style?: React.CSSProperties;
  variant?: "block" | "circle";
  width?: string | number;
};

const Skeleton = (props: SkeletonProps) => {
  const { animation = true, asElement: Component = "span", className, height, ref, style, variant = "block", width } = props;

  return (
    <Component
      ref={ref}
      className={classNames(
        "skeleton",
        variant === "circle" && "skeleton-circle",
        variant === "block" && "skeleton-block",
        animation && "animate-pulse",
        className
      )}
      style={{
        width,
        height,
        ...style
      }}
    />
  );
};

export default Skeleton;
